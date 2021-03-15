const Movie = require('../models/movie');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ForbiddenError = require('../errors/403_ForbiddenError');

const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError({ message: CLIENT_ERROR.MOVIE_NOT_FOUND });
      }
      res.send({ data: movies });
    })
    .catch((error) => {
      next(error);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;
  Movie.create(newMovie)
    .then((movie) => res.send({ data: movie }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(error.message);
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError({ message: CLIENT_ERROR.MOVIE_NOT_FOUND });
      } else if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movieForDelete) => {
            if (!movieForDelete) {
              throw new NotFoundError({ message: CLIENT_ERROR.MOVIE_NOT_FOUND });
            }
            res.send({ data: movieForDelete });
          })
          .catch(next);
      } else {
        throw new ForbiddenError({ message: SUCCESS.REMOVE_MOVIE });
      }
    })
    .catch(next);
};
