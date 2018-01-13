import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  template: `
    <app-loading [isLoading]="isLoadingResults"></app-loading>
    <h1>Overview</h1>
    <mat-menu #movieMenu="matMenu">
      <button mat-menu-item color="accent" (click)="onNew()">
        <mat-icon>mode_edit</mat-icon>
        <span>create movie</span>
      </button>
      <button mat-menu-item color="accent" (click)="onSave()" [disabled]="!selectedMovie">
        <mat-icon>save</mat-icon>
        <span>save movie</span>
      </button>
      <button mat-menu-item color="warn" (click)="onDelete()" [disabled]="!checkedMovies.length">
        <mat-icon>delete_forever</mat-icon>
        <span>delete checked movies</span>
      </button>
    </mat-menu>
    <button class="movieMenu" mat-raised-button [matMenuTriggerFor]="movieMenu" color="primary">
      <mat-icon>menu</mat-icon>
      Actions
    </button>
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
    .movieMenu {
      margin-bottom: 20px;
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
    this.selectedMovie.id === 0 ? this.movieService.createMovie(this.selectedMovie) : this.movieService.updateMovie(this.selectedMovie); // TODO: wow much skill such safe
  }

  public onNew() {
    this.selectedMovie = new Movie(0, 'new movie');
  }
}
