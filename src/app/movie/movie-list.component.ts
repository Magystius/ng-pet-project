import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from './movie';
import {MovieService} from './movie.service';

@Component({
  selector: 'app-movie-list',
  template: `
    <ul class="list-group">
      <li *ngFor="let movie of movies; let i = index"
          [ngClass]="isMovieSelected(movie)">
        {{i + 1}} - {{movie.title}}
      </li>
    </ul>
  `,
  styles: []
})
export class MovieListComponent implements OnInit {

  @Input() public selectedMovies: Array<Movie>;
  @Output() public selectedMoviesChange = new EventEmitter<Array<Movie>>();

  public movies: Array<Movie> = [];

  constructor(private movieService: MovieService) {
    this.movieService.movies$.subscribe(movies => this.movies = movies);
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

  public isMovieSelected(movie: Movie) {
    const isActive = this.selectedMovies
      .map(current => current.id)
      .some((currentId, index, movieIds) => movieIds.includes(movie.id));
    return {
      'list-group-item': true,
      'active': isActive
    };
  }

}
