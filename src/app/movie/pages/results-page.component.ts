import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {ActivatedRoute, Params} from '@angular/router';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-results-page',
  template: `
    <h1>Results: </h1>
    <h4>searched query: {{query}}</h4>
    <app-movie-list [(selectedMovie)]="selectedMovie"></app-movie-list>
  `,
  styles: []
})
export class ResultsPageComponent implements OnInit {

  public selectedMovie: Movie;
  public query: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.query = params.query;
      this.movieService.getMovie(params.query).subscribe((movie) => this.selectedMovie = movie);
    });
  }

}
