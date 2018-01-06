import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Movie} from './movie/movie';


export class InMemoryMovieServiceService implements InMemoryDbService {

  createDb() {
    const movies: Array<Movie> = [];
    movies.push(new Movie(1, 'Titanic', 'ship => iceberg', 5));
    movies.push(new Movie(2, 'Avatar', 'blue people on an alien planet', 8));
    return {movies};
  }
}
