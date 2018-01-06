import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';

@Injectable()
export class MovieService {

  public movies$: Subject<Array<Movie>>;
  public movieCounter$: Subject<number>;

  constructor(private http: HttpClient) {
    this.movies$ = new Subject();
    this.movieCounter$ = new Subject();
  }

  public getMovies(): void {
    const request$: ConnectableObservable<Array<Movie>> = this.http
      .get<Array<Movie>>('/api/movies')
      .retry(3)
      .publish();

    request$
      .subscribe(movies => this.movies$.next(movies),
        (error: HttpErrorResponse) => {
          this.logError(error);
          this.movies$.error(error);
        });

    request$
      .map(movies => movies.length)
      .subscribe(numberOfMovies => this.movieCounter$.next(numberOfMovies),
        (error: HttpErrorResponse) => {
          this.logError(error);
          this.movieCounter$.error(error);
        });

    request$.connect();
  }

  public getMovie(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>('/api/movies/' + movieId)
      .retry(3);
  }

  private logError(error: HttpErrorResponse): void {
    error.error instanceof Error ?
      console.log('error occured: ' + error.message) : console.log('server responsed with error: ' + error.message);
  }

}
