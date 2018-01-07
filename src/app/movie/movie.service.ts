import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import {MessageService} from '../message/message.service';

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
      .publish();

    request$
      .subscribe(movies => this.movies$.next(movies),
        (error: HttpErrorResponse) => {
          this._logError(error);
          this.movies$.error(error);
        });

    request$
      .map(movies => movies.length)
      .subscribe(numberOfMovies => this.movieCounter$.next(numberOfMovies),
        (error: HttpErrorResponse) => {
          this._logError(error);
          this.movieCounter$.error(error);
        });

    request$.connect();

    this.messageService.show('MovieService: fetched movies');
  }

  public getMovie(movieId: string): Observable<Movie> {
    this.messageService.show('MovieService: fetched movie #' + movieId);

    return this.http
      .get<Movie>('/api/movies/' + movieId)
      .retry(3);
  }

  private _logError(error: HttpErrorResponse): void {
    this.messageService.show('MovieService: error occured: ' + error.message);
    error.error instanceof Error ?
      console.log('error occured: ' + error.message) : console.log('server responsed with error: ' + error.message);
  }

}
