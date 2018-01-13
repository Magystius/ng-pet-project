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
    movies.push(new Movie(4, 'The Prestige', Genre.MYSTERY,
      'After a tragic accident two stage magicians engage in a battle to create the ultimate illusion whilst sacrificing everything they have to outwit the other.',
      ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'], 8));
    movies.push(new Movie(5, 'The Sixth Sense', Genre.THRILLER,
      'A boy who communicates with spirits seeks the help of a disheartened child psychologist.',
      ['Bruce Willis', 'Haley Joel Osment', 'Toni Collette'], 8));
    movies.push(new Movie(6, 'Sharknado', Genre.COMEDY,
      'When a freak hurricane swamps Los Angeles, nature\'s deadliest killer rules sea, land, and air as thousands of sharks terrorize the waterlogged populace.',
      ['Ian Ziering', 'Tara Reid', 'John Heard'], 3));
    movies.push(new Movie(7, 'The Godfather', Genre.DRAMA,
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      ['Marlon Brando', 'Al Pacino', 'James Caan'], 9));
    movies.push(new Movie(8, 'The Wizard of Oz', Genre.SCIENCE_FICTION,
      'L. Frank Baum\'s classic tale comes to magisterial Technicolor life! The Wizard of Oz stars legendary Judy Garland as Dorothy, an innocent farm girl ' +
      'whisked out of her mundane earthbound existence into a land of pure imagination. Dorothy\'s journey in Oz will take her through emerald forests, yellow brick roads,' +
      ' and creepy castles, all with the help of some unusual but earnest song-happy friends.',
      ['Judy Garland', 'Ray Bolger', 'Jack Haley', 'Bert Lahrt', 'Margaret Hamilton', 'Frank Morgan'], 9));
    movies.push(new Movie(9, 'Casablanca', Genre.DRAMA,
      'One of the most beloved American films, this captivating wartime adventure of romance and intrigue from director Michael Curtiz defies standard categorization. ' +
      'Simply put, it is the story of Rick Blaine (Humphrey Bogart), a world-weary ex-freedom fighter who runs a nightclub in Casablanca during the early part of' +
      ' WWII. Despite pressure from the local authorities, notably the crafty Capt. Renault (Claude Rains), Rick\'s café (C) has become a haven for refugees ' +
      'looking to purchase illicit letters of transit which will allow them to escape to America. One day, to Rick\'s great surprise, he is approached by the ' +
      'famed rebel Victor Laszlo (Paul Henreid) and his wife, Ilsa (Ingrid Bergman), Rick\'s true love who deserted him when the Nazis invaded Paris. She still ' +
      'wants Victor to escape to America, but now that she\'s renewed her love for Rick, she wants to stay behind in Casablanca. "You must do the thinking for ' +
      'both of us," she says to Rick. He does, and his plan brings the story to its satisfyingly logical, if not entirely happy, conclusion. ~ Robert Firsching, Rovi',
      ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid', 'Conrad Veidt', 'Claude Rains', 'Sydney Greenstreet'], 6));
    movies.push(new Movie(10, 'Life of Brian', Genre.COMEDY,
      'The story of Brian of Nazareth, born on the same day as Jesus of Nazareth, who takes a different path in life that leads to the same conclusion. ' +
      'Brian joins a political resistance movement aiming to get the Romans out of Judea. Brian scores a victory of sorts when he manages to paint political slogans ' +
      'on an entire wall in the city of Jerusalem. The movement is not very effective but somehow Brian becomes a prophet and gathers his own following. His fate is ' +
      'sealed however and he lives a very short life.',
      ['John Cleese', 'Graham Chapman', 'Terry Gilliam', 'Eric Idle', 'Terry Jones', 'Michael Palin'], 7));
    movies.push(new Movie(11, 'The Spy Who Loved Me', Genre.ACTION,
      'James Bond is back again and his new mission is to find out how a Royal Navy Polaris submarine holding sixteen nuclear warheads simply disappears ' +
      'whilst on patrol. Bond joins Major Anya Amasova and takes on a a web-handed mastermind, known as Karl Stromberg, as well as his henchman Jaws, who has a ' +
      'mouthful of metal teeth. Bond must track down the location of the missing submarine before the warheads are fired',
      ['Roger Moore', 'Barbara Bach', 'Curd Jürgens', 'Richard Kiel', 'Caroline Munro'], 7));
    movies.push(new Movie(12, 'Alien: Covenant', Genre.MYSTERY,
      'Almost eleven years after the futile and disastrous expedition on the distant moon LV-223, the deep-space colonisation vessel Covenant ' +
      'equipped with more than 2,000 colonists in cryogenic hibernation, sets a course for the remote planet Origae-6 with the intention to build a new world. ' +
      'Instead, a rogue transmission will entice the crew to a nearby habitable small planet which resembles The Earth. The unsuspecting members of Covenant will' +
      ' have to cope with biological foes, beyond human comprehension. Ultimately, what was intended as a peaceful exploratory mission, will soon turn into a desperate ' +
      'rescue operation deep into the cold infinite space.',
      ['Michael Fassbender', 'Katherine Waterston', 'Billy Crudup'], 6));
    return {movies};
  }
}
