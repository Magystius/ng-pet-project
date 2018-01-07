import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Movie} from './movie/movie';
import {Genre} from './movie/genre.enum';


export class InMemoryMovieServiceService implements InMemoryDbService {

  createDb() {
    const movies: Array<Movie> = [];
    movies.push(new Movie(1, 'Titanic', Genre.DRAMA,
      'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
      ['Leonardo DiCaprio', 'Kate Winslet'], 5));
    movies.push(new Movie(2, 'Avatar', Genre.SCIENCE_FICTION,
      'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
      ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'], 7));
    movies.push(new Movie(3, 'Pulp Fiction', Genre.ACTION,
      'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'], 8));
    movies.push(new Movie(4, 'The Prestige', Genre.ACTION,
      'After a tragic accident two stage magicians engage in a battle to create the ultimate illusion whilst sacrificing everything they have to outwit the other.',
      ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'], 8));
    movies.push(new Movie(5, 'The Sixth Sense', Genre.ACTION,
      'A boy who communicates with spirits seeks the help of a disheartened child psychologist.',
      ['Bruce Willis', 'Haley Joel Osment', 'Toni Collette'], 8));
    movies.push(new Movie(6, 'Sharknado', Genre.ACTION,
      'When a freak hurricane swamps Los Angeles, nature\'s deadliest killer rules sea, land, and air as thousands of sharks terrorize the waterlogged populace.',
      ['Ian Ziering', 'Tara Reid', 'John Heard'], 3));
    return {movies};
  }
}
