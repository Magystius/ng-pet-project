import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  template: `
    <app-loading [isLoading]="isLoadingResults"></app-loading>
    <h1>Overview</h1>
    <div class="actions">
      <h4>Available Actions: </h4>
      <ng-container *ngIf="selectedMovie">
        <button mat-raised-button color="accent" matTooltip="Save it forever!" matTooltipPosition="above" (click)="onSave()">Save!</button>
      </ng-container>
      <ng-container *ngIf="checkedMovies.length">
        <button mat-raised-button color="warn" matTooltip="Delete all the things!" matTooltipPosition="above" (click)="onDelete()">Delete!</button>
      </ng-container>
    </div>
    <app-movie-list [(checkedMovies)]="checkedMovies" (selectedMovieChange)="onSelectedMovieChange($event)"
                    [selectable]="true" [filterable]="true"></app-movie-list>
    <ng-container *ngIf="selectedMovie">
      <app-movie-form [movie]="selectedMovie"></app-movie-form>
    </ng-container>
  `,
  styles: [`
    h1 {
      margin-bottom: 30px;
    }
    .actions {
      padding: 10px;
    }
  `]
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
    this.movieService.updateMovie(this.selectedMovie);
  }
}
