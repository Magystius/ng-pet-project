import {Component, OnInit} from '@angular/core';
import {Movie} from '../../movie';
import {MovieService} from '../../movie.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  public isLoadingResults = false;
  public checkedMovies: Array<Movie> = [];
  public selectedMovie: Movie;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.isLoadingResults = true;
        this.movieService.getMovie(params.id).subscribe(movie => {
          this.selectedMovie = movie;
          this.isLoadingResults = false;
        });
      }
    });
  }

  public onSelectedMovieChange($event: Movie): void {
    this.router.navigate(['overview', $event.id]);
  }

  public onDelete(): void {
    if (this.selectedMovie && this.checkedMovies.map(movie => movie.id).includes(this.selectedMovie.id)) {
      this.selectedMovie = null; // TODO: hm...
    }
    this.checkedMovies.forEach(movie => this.movieService.deleteMovie(movie));
  }

  public onSave(): void {
    this.selectedMovie.id === 0 ? // TODO: wow much skill such safe
      this.movieService.createMovie(this.selectedMovie) :
      this.movieService.updateMovie(this.selectedMovie);
  }

  public onNew(): void {
    this.selectedMovie = new Movie(0, 'new movie');
  }
}
