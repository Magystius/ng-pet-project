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
            <mat-card-subtitle>{{movie.genre | uppercase}}</mat-card-subtitle>
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
            <mat-card-footer><h6>Rating: <span>{{movie.rating}} / 10</span></h6></mat-card-footer>
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
    h6 {
      font-weight: bold;
      color: gray;
    }
    .col-md-3 {
      display: flex;
      flex-direction: column;
    }
    .movie-card {
      margin-top: 10px;
      flex: 1;
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
   return '/assets/science-fiction.jpg';
  }
}
