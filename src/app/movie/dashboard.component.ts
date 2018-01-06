import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-grid-list cols="3" rowHeight="200px">
      <mat-grid-tile *ngFor="let movie of movies$|async">
        <mat-card class="movie-card">
          <mat-card-title>{{movie.title}}</mat-card-title>
          <mat-card-content>{{movie.description}}</mat-card-content>
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
    <app-movie-counter [movies]="movieCounter$ | async"></app-movie-counter>
  `,
  styles: [`
    .movie-card {
      width: 400px;
    }
  `]
})
export class DashboardComponent implements OnInit {

  movies$: Subject<Array<Movie>>;
  movieCounter$: Subject<number>;

  constructor(private movieService: MovieService) {
    this.movies$ = movieService.movies$;
    this.movieCounter$ = movieService.movieCounter$;
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

}
