import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from './movie';
import {MovieService} from './movie.service';

@Component({
  selector: 'app-movie-list',
  template: `
    <ul class="list-group">
      <li *ngFor="let movie of movies; let i = index" [class]="movie.id === selectedMovie.id ? 'list-group-item active' : 'list-group-item'">
        {{i + 1}} - {{movie.title}}
      </li>
    </ul>
  `,
  styles: []
})
export class MovieListComponent implements OnInit {

  @Input() public selectedMovie: Movie;
  @Output() public selectedMovieChange = new EventEmitter<Movie>();

  public movies: Array<Movie> = [];

  constructor(private movieService: MovieService) {
    this.movieService.movies$.subscribe(movies => this.movies = movies);
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

}
