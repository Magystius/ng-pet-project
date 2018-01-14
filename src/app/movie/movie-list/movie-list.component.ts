import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @Input()
  set checkedMovies(movies: Array<Movie>) {
    this.selection.clear();
    movies.forEach(movie => this.selection.select(movie.id));
  }

  @Input() public filterable = true;

  @Input()
  set selectable(selectable: boolean) {
    selectable ? this.displayedColumns.unshift('select') : this.displayedColumns.filter(column => column !== 'select');
  }

  @Output() public checkedMoviesChange = new EventEmitter<Array<Movie>>();
  @Output() public selectedMovieChange = new EventEmitter<Movie>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public isLoadingResults = true;
  public dataSource = new MatTableDataSource<Movie>();
  public displayedColumns = ['id', 'title', 'genre', 'description', 'actors', 'rating'];
  public filterValue = '';

  public selection = new SelectionModel<number>(true, []);
  private movies: Array<Movie> = [];
  private selectedMovie: Movie;

  constructor(private movieService: MovieService, private breakpointObserver: BreakpointObserver) {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.dataSource.data = movies;
      const movieIds = movies.map(movie => movie.id);
      this.selection.selected
        .filter(id => !movieIds.includes(id))
        .forEach(id => this.selection.deselect(id));
      this._emitCheckedMovieChange();
    });
    breakpointObserver.observe([
      '(max-width: 1024px)'
    ]).subscribe(result => this._determineDisplayedColumns(result.matches));
  }

  ngOnInit() {
    this.movieService.movies$
      .takeWhile(() => this.isLoadingResults)
      .subscribe(() => this.isLoadingResults = false);
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
    this._emitCheckedMovieChange();
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
    this._emitCheckedMovieChange();
  }

  public toggleCheck(movieId: number) {
    this.selection.toggle(movieId);
    this._emitCheckedMovieChange();
  }

  public getMovieStyle(movie: Movie): any {
    return {
      'toggled': this.selection.selected ? this.selection.selected.includes(movie.id) : false,
      'selected': this.selectedMovie ? this.selectedMovie.id === movie.id : false
    };
  }

  public onSelectedMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.selectedMovieChange.emit(movie);
  }

  private _emitCheckedMovieChange() {
    this.checkedMoviesChange.emit(this.movies
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
