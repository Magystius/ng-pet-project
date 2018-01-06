const express = require("express");
const logger = require("morgan");

// ================== SET UP MOVIES ==============
class Movie {
  constructor(id, title, description, rating) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}

let movies = new Map();

let generateId = () => Math.random().toString(36).substr(2, 8);
let addMovie = (movie) => movies.set(movie.id, movie);

addMovie(new Movie(generateId(), 'Titanic', 'oh no, please no!', 5));
addMovie(new Movie(generateId(), 'Avatar', 'blue people with telepathic hair', 8));
addMovie(new Movie(generateId(), 'Inception', 'is this the real world', 10));

// ================== SET UP EXPRESS ==============
let app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

app.get('/api/movies', (req, res) => {
  res.status(200).json(Array.from(movies, (entry) => entry[1]))
});
app.get('/api/movies/:id', (req, res) => {
  let id = req.params.id;
  movies.has(id) ? res.status(200).json(movies.get(id)) : res.status(404).json({error: 'not found'});
});

app.listen(app.get('port'), () => {
  console.log(('Server is running at http://localhost:%d'), app.get('port'));
  console.log('Press CTRL-C to stop\n');
});
