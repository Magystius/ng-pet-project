import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../movie.service';
import {Subject} from 'rxjs/Subject';
import {Movie} from '../../movie';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Genre} from '../../genre.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public isLoadingResults = true;
  public topMovies$: Observable<Array<Movie>>;
  public movieCounter$: Subject<number>;

  constructor(private movieService: MovieService, private router: Router) {
    this.topMovies$ = movieService.movies$.map(movies => movies.sort((a, b) => b.rating - a.rating).slice(0, 4));
    this.movieCounter$ = movieService.movieCounter$;
  }

  ngOnInit() {
    this.movieService.movies$
      .takeWhile(() => this.isLoadingResults)
      .subscribe(() => this.isLoadingResults = false);
    this.movieService.getMovies();
  }

  public getImageId(genre: Genre) {
    switch (genre) {
      case Genre.SCIENCE_FICTION: {
        return '/assets/science-fiction.jpg';
      }
      case Genre.DRAMA: {
        return '/assets/drama.jpg';
      }
      case Genre.THRILLER: {
        return '/assets/thriller.jpg';
      }
      case Genre.ACTION: {
        return '/assets/action.jpg';
      }
      case Genre.MYSTERY: {
        return '/assets/mystery.jpg';
      }
      case Genre.COMEDY: {
        return '/assets/comedy.jpg';
      }
    }
  }

  public onMovieDelete(id: number) {
    this.movieService.deleteMovie(id);
  }

  public onMovieEdit(id: number) {
    this.router.navigate(['overview', id]);
  }
}
