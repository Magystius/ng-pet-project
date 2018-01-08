import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Genre} from './genre.enum';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container-fluid">
      <h1>Top Movies:</h1>
      <div class="row" *ngIf="topMovies$ | async as movies; else loading">
        <h1 *ngIf="!movies.length">No Movies Found!</h1>
        <div class="col-sm-6 col-md-3" *ngFor="let movie of movies">
          <mat-card class="movie-card">
            <mat-card-title>{{movie.title}}</mat-card-title>
            <mat-card-subtitle>
              <mat-chip-list>
                <mat-chip color="primary">Rating: {{movie.rating}}</mat-chip>
                <mat-chip color="primary">{{movie.genre | uppercase}}</mat-chip>
              </mat-chip-list>
            </mat-card-subtitle>
            <img mat-card-image [src]="getImageId(movie.genre)">
            <mat-card-content>
              <h6>Actors:</h6>
              <ul class="list-group">
                <li class="list-group-item actor" *ngFor="let actor of movie.actors">
                  {{actor}}
                </li>
              </ul>
              <hr/>
              <h6>Description:</h6>
              <p>{{movie.description}}</p>
              <hr/>
            </mat-card-content>
            <mat-card-actions class="movie-card-actions">
              <button mat-mini-fab class="movie-card-action" (click)="onMovieEdit(movie.id)"><i class="fas fa-edit"></i></button>
              <button mat-mini-fab class="movie-card-action" (click)="onMovieDelete(movie.id)"><i class="fas fa-trash-alt"></i></button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
      <ng-template #loading>Loading User Data...</ng-template>
    </div>
    <app-movie-counter [movies]="movieCounter$ | async"></app-movie-counter>
  `,
  styles: [`
    h1 {
      text-align: center;
    }
    .col-md-3 {
      display: flex;
      flex-direction: column;
    }
    .movie-card {
      margin-top: 10px;
      flex: 1;
    }
    .movie-card-actions {
      text-align: right;
    }
    .movie-card-action {
      margin-right: 10px;
      margin-bottom: 5px;
    }
    .actor {
      font-size: small;
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

  public getImageId(genre: Genre) {
    switch (genre) {
      case Genre.SCIENCE_FICTION: {
        return '/assets/science-fiction.jpg';
      }
      case Genre.DRAMA: {
        return '/assets/drama.jpg';
      }
      case Genre.THRILLER: {
        return '/assets/thriller.jpg';
      }
      case Genre.ACTION: {
        return '/assets/action.jpg';
      }
      case Genre.MYSTERY: {
        return '/assets/mystery.jpg';
      }
      case Genre.COMEDY: {
        return '/assets/comedy.jpg';
      }
    }
  }

  public onMovieDelete(id: number) {
    this.movieService.deleteMovie(id);
  }

  public onMovieEdit(id: number) {
    alert('to edit: ' + id);
  }
}
