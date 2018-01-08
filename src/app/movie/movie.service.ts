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

@Injectable()
export class MovieService {

  public movies$: Subject<Array<Movie>> = new Subject();
  public movieCounter$: Subject<number> = new Subject();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public getMovies(): void {
    const request$: ConnectableObservable<Array<Movie>> = this.http
      .get<Array<Movie>>('/api/movies')
      .retry(3)
      .catch(error => {
        this._logError(error);
        return of([]);
      })
      .do(movies => movies.length ? this.messageService.info('MovieService: fetched movies') : this.messageService.error('MovieService: no movies found'))
      .publish();

    request$
      .subscribe(movies => this.movies$.next(movies));

    request$
      .map(movies => movies.length)
      .subscribe(numberOfMovies => this.movieCounter$.next(numberOfMovies));

    request$.connect();
  }

  public getMovie(movieId: number): Observable<Movie> {
    return this.http
      .get<Movie>('/api/movies/' + movieId)
      .retry(3)
      .catch(error => {
        this._logError(error);
        return of(null);
      })
      .do(movie => movie ? this.messageService.info(`MovieService: fetched movie #${movieId}`) : this.messageService.error(`MovieService: no movie for #${movieId}`));
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
      .do(error => !error ? this.messageService.success(`MovieService: deleted movie #${movie}`) : this.messageService.error(`MovieService: no movie for #${movie}`))
      .subscribe(() => this.getMovies());
  }

  private _logError(error: HttpErrorResponse): void {
    error.error instanceof Error ? console.log('error occured: ' + error.message) : console.log('server responsed with error: ' + error.message);
  }

}
