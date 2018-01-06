import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie/movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from './movie/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

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
