const Movie = require('../models/movie');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ForbiddenError = require('../errors/403_ForbiddenError');

const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(new NotFoundError({ message: CLIENT_ERROR.MOVIE_NOT_FOUND }))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(() => {
      throw new BadRequestError({ message: CLIENT_ERROR.MOVIE_NOT_FILLED });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError({ message: CLIENT_ERROR.MOVIE_NOT_FOUND }))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: CLIENT_ERROR.FORBIDDEN });
      }
      movie.remove()
        .then(() => res.status(200).send({ message: SUCCESS.REMOVE_MOVIE }));
    })
    .catch(next);
};
