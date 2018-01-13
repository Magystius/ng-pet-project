import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Movie} from './movie';
import {MovieService} from './movie.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-movie-list',
  template: `
    <div class="movie-table-container mat-elevation-z8">
      <div class="movie-table-header" *ngIf="filterable">
        <mat-form-field>
          <input matInput [(ngModel)]="filterValue" (keyup)="applyFilter()" placeholder="Filter" type="text">
          <mat-hint align="start">fuzzy search all the movies</mat-hint>
          <mat-hint align="end">{{filterValue.length}} / 256</mat-hint>
          <button mat-button *ngIf="filterValue" matSuffix mat-icon-button matTooltip="Clear!" matTooltipPosition="above" (click)="clearFilter()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </div>
      <mat-table #movieTable [dataSource]="dataSource" matSort matSortActive="id" matSortDirection="asc">
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef mat-sort-header> #</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Title</mat-header-cell>
          <mat-cell *matCellDef="let movie"><strong>{{movie.title}}</strong></mat-cell>
        </ng-container>
        <ng-container matColumnDef="genre">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Genre</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.genre}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="description">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Description</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.description}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actors">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Actors</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.actors}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="rating">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Rating</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.rating}}</mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let movie; columns: displayedColumns" [ngClass]="isMovieSelected(movie)"></mat-row>
      </mat-table>
    </div>

  `,
  styles: [`
    .active {
      background-color: aqua;
    }

    .movie-table-header {
      min-height: 64px;
      padding: 8px 24px 12px;
      background-color: #e9e9e9;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }

    .movie-table-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;
    }
    .mat-table {
      overflow: auto;
      max-height: 500px;
    }
    .mat-column-description {
      min-width: 200px;
    }
  `]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @Input() public selectedMovies: Array<Movie>;
  @Output() public selectedMoviesChange = new EventEmitter<Array<Movie>>();
  @Input() public filterable = true;

  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<Movie>();
  public displayedColumns = ['id', 'title', 'genre', 'description', 'actors', 'rating'];
  public filterValue = '';

  constructor(private movieService: MovieService) {
    this.movieService.movies$.subscribe(movies => {
      this.dataSource.data = movies;
    });
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  public clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }

  public isMovieSelected(movie: Movie) {
    const isActive = this.selectedMovies ? this.selectedMovies
      .map(current => current.id)
      .some((currentId, index, movieIds) => movieIds.includes(movie.id)) : false;
    return {
      'list-group-item': true,
      'active': isActive
    };
  }

}
