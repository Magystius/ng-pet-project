import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import {MessageService} from '../message/message.service';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import {zip} from 'rxjs/observable/zip';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import {from} from 'rxjs/observable/from';
import 'rxjs/add/operator/max';

@Injectable()
export class MovieService {

  public movies$: Subject<Array<Movie>> = new Subject();
  public movieCounter$: Subject<number> = new Subject();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public getMovies(): void {
    const request$: ConnectableObservable<Array<Movie>> = this._createGetRequest<Array<Movie>>('/api/movies')
      .do(movies => movies.length ? this.messageService.info('MovieService: fetched movies') :
        this.messageService.error('MovieService: no movies found'))
      .publish();

    request$
      .subscribe(movies => this.movies$.next(movies));
    request$
      .map(movies => movies.length)
      .subscribe(numberOfMovies => this.movieCounter$.next(numberOfMovies));

    request$.connect();
  }

  public getMovie(movieId: number): Observable<Movie> {
    return this._createGetRequest<Movie>('/api/movies/' + movieId)
      .do(movie => movie ? this.messageService.info(`MovieService: fetched movie #${movieId}`) :
        this.messageService.error(`MovieService: no movie for #${movieId}`));
  }

  public searchMovie(query: string): Observable<Array<Movie>> {
    const queryByTitle = this._createGetRequest<Array<Movie>>('/api/movies/?title=.*' + query + '.*');
    const queryByGenre = this._createGetRequest<Array<Movie>>('/api/movies/?genre=.*' + query + '.*');
    const queryByActor = this._createGetRequest<Array<Movie>>('/api/movies/?actors=.*' + query + '.*');

    return zip(queryByTitle, queryByGenre, queryByActor)
      .map(movieLists => movieLists[0].concat(movieLists[1]).concat(movieLists[2])) // TODO: optimize this
      .do(movies => movies.length ? this.messageService.info(`MovieService: found movies for query: ${query}`) :
        this.messageService.error(`MovieService: no movies for query: ${query}`));
  }

  public createMovie(movie: Movie): void {
    this._createGetRequest<Array<Movie>>('/api/movies/')
      .mergeMap(movies => from(movies))
      .max((a: Movie, b: Movie) => a.id < b.id ? -1 : 1)
      .map(movieWithHighestId => movieWithHighestId.id)
      .switchMap(maxId => {
        movie.id = maxId + 1;
        return this.http
          .post<Movie>('/api/movies/', movie)
          .retry(3)
          .catch(error => {
            this._logError(error);
            return of(error);
          })
          .do(error => !error ? this.messageService.success(`MovieService: created movie #${movie.id}`) :
            this.messageService.error(`MovieService: error while creating movie #${movie.id}`));
      })
      .subscribe(() => this.getMovies());
  }

  public updateMovie(movie: Movie): void {
    this.http
      .put<Movie>('/api/movies/' + movie.id, movie)
      .retry(3)
      .catch(error => {
        this._logError(error);
        return of(error);
      })
      .do(error => !error ? this.messageService.success(`MovieService: updated movie #${movie.id}`) :
        this.messageService.error(`MovieService: no movie found for #${movie.id}`))
      .subscribe(() => this.getMovies());
  }

  public deleteMovie(movie: number | Movie): void {
    const id = typeof movie === 'number' ? movie : movie.id;
    this.http
      .delete<Movie>('/api/movies/' + id)
      .retry(3)
      .catch(error => {
        this._logError(error);
        return of(error);
      })
      .do(error => !error ? this.messageService.success(`MovieService: deleted movie #${id}`) :
        this.messageService.error(`MovieService: no movie for #${id}`))
      .subscribe(() => this.getMovies());
  }

  private _logError(error: HttpErrorResponse): void {
    error.error instanceof Error ? console.log('error occured: ' + error.message) :
      console.log('server responsed with error: ' + error.message);
  }

  private _createGetRequest<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url)
      .retry(3)
      .catch(error => {
        this._logError(error);
        return of(null);
      });
  }
}
