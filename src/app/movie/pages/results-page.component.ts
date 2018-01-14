import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {ActivatedRoute, Params} from '@angular/router';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-results-page',
  template: `
    <h1>Results </h1>
    <h4>searched query: <em>{{query}}</em></h4>
    <app-movie-list [(checkedMovies)]="selectedMovies" [selectable]="false" [filterable]="false" [sortBySelect]="true"></app-movie-list>
  `,
  styles: [`
    h4 {
      padding-bottom: 20px;
      color: gray;
    }
  `]
})
export class ResultsPageComponent implements OnInit {

  public selectedMovies: Array<Movie>;
  public query: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.query = params.query;
      this.movieService.searchMovie(params.query)
        .subscribe((movies) => movies.length ? this.selectedMovies = movies : []);
    });
  }

}
