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

  public onSelectedMovieChange($event: Movie) {
    this.router.navigate(['overview', $event.id]);
  }

  public onDelete() {
    if (this.selectedMovie && this.checkedMovies.map(movie => movie.id).includes(this.selectedMovie.id)) {
      this.selectedMovie = null;
    }
    this.checkedMovies.forEach(movie => this.movieService.deleteMovie(movie));
  }

  public onSave() {
    this.selectedMovie.id === 0 ? this.movieService.createMovie(this.selectedMovie) : this.movieService.updateMovie(this.selectedMovie); // TODO: wow much skill such safe
  }

  public onNew() {
    this.selectedMovie = new Movie(0, 'new movie');
  }
}
