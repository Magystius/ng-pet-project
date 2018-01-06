import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie';

@Component({
  selector: 'app-dashboard',
  template: `
    <ul>
      <li *ngFor="let movie of movies$|async">
        {{movie.title}} - {{movie.description}}
      </li>
    </ul>
    <h4>{{movieCounter$ | async}}</h4>
  `,
  styles: []
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
