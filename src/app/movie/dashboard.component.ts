import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 col-md-3" *ngFor="let movie of topMovies$|async">
          <mat-card class="movie-card">
            <mat-card-title>{{movie.title}}</mat-card-title>
            <mat-card-subtitle>{{movie.genre | uppercase}}</mat-card-subtitle>
            <img mat-card-image src="/assets/science-fiction.jpg">
            <mat-card-content>
              <ul>
                <li *ngFor="let actor of movie.actors">
                  {{actor}}
                </li>
              </ul>
              {{movie.description}}
            </mat-card-content>
            <mat-card-footer>{{movie.rating}}</mat-card-footer>

          </mat-card>
        </div>
      </div>
    </div>
    <app-movie-counter [movies]="movieCounter$ | async"></app-movie-counter>
  `,
  styles: [`
    .col-md-3 {
      display: flex;
      flex-direction: column;
    }
    .movie-card {
      margin-top: 10px;
      flex: 1;
    }
  `]
})
export class DashboardComponent implements OnInit {

  topMovies$: Observable<Array<Movie>>;
  movieCounter$: Subject<number>;

  constructor(private movieService: MovieService) {
    this.topMovies$ = movieService.movies$.map(movies => movies.sort((a, b) => b.rating - a.rating).slice(0, 4));
    this.movieCounter$ = movieService.movieCounter$;
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

}
