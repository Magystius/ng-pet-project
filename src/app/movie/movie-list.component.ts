import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Movie} from './movie';
import {MovieService} from './movie.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BreakpointObserver} from '@angular/cdk/layout';

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
        <ng-container matColumnDef="select">
          <mat-header-cell *matHeaderCellDef>
            <mat-checkbox (change)="toggleAll()"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()">
            </mat-checkbox>
          </mat-header-cell>
          <mat-cell *matCellDef="let movie">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="toggleSelection(movie.id)"
                          [checked]="selection.isSelected(movie.id)">
            </mat-checkbox>
          </mat-cell>
        </ng-container>
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
          <mat-cell *matCellDef="let movie"> {{movie.genre | capitalize}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="description">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Description</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.description | trim: 100}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actors">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Actors</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.actors | list}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="rating">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Rating</mat-header-cell>
          <mat-cell *matCellDef="let movie"> {{movie.rating}}</mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let movie; columns: displayedColumns" [ngClass]="isMovieSelected(movie)"></mat-row>
      </mat-table>
      <mat-paginator #moviePaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]">
      </mat-paginator>
    </div>

  `,
  styles: [`
    .active {
      background-color: #b2dfdb;
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

    .mat-cell {
      padding: 0px 20px 0 20px;
    }

    .mat-column-select {
      overflow: initial;
      max-width: 75px;
    }

    .mat-column-description {
      min-width: 400px;
    }
  `]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @Input()
  set selectedMovies(movies: Array<Movie>) {
    this.selection.clear();
    movies.forEach(movie => this.selection.select(movie.id));
  }

  @Input() public filterable = true;

  @Input()
  set selectable(selectable: boolean) {
    selectable ? this.displayedColumns.unshift('select') : this.displayedColumns.filter(column => column !== 'select');
  }

  @Output() public selectedMoviesChange = new EventEmitter<Array<Movie>>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<Movie>();
  public displayedColumns = ['id', 'title', 'genre', 'description', 'actors', 'rating'];
  public filterValue = '';

  public selection = new SelectionModel<number>(true, []);
  private movies: Array<Movie> = [];

  constructor(private movieService: MovieService, private breakpointObserver: BreakpointObserver) {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.dataSource.data = movies;
    });
    breakpointObserver.observe([
      '(max-width: 1024px)'
    ]).subscribe(result => this._determineDisplayedColumns(result.matches));
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    const filteredMovieIds = this.dataSource.filteredData
      .map(filteredMovie => filteredMovie.id);
    this.movies
      .filter(movie => !filteredMovieIds.includes(movie.id))
      .forEach(movie => this.selection.deselect(movie.id));
    this._emitSelectedMovieChange();
  }

  public clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }

  public isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  public toggleAll() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(movie => this.selection.select(movie.id));
    this._emitSelectedMovieChange();
  }

  public toggleSelection(movieId: number) {
    this.selection.toggle(movieId);
    this._emitSelectedMovieChange();
  }

  public isMovieSelected(movie: Movie): any {
    return {
      'active': this.selection.selected ? this.selection.selected.includes(movie.id) : false
    };
  }

  private _emitSelectedMovieChange() {
    this.selectedMoviesChange.emit(this.movies
      .filter(movie => this.selection.selected.includes(movie.id)));
  }

  private _determineDisplayedColumns(smallScreen: boolean) {
    if (smallScreen && this.displayedColumns.indexOf('description') !== -1) {
      this.displayedColumns.splice(this.displayedColumns.indexOf('description'), 1);
    } else if (this.displayedColumns.indexOf('description') === -1) {
      this.displayedColumns.splice(this.displayedColumns.indexOf('genre') + 1, 0, 'description');
    }
  }

}
