const Movie = require('../models/movie');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ForbiddenError = require('../errors/403_ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(new NotFoundError({ message: 'Фильма не существует' }))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      throw new BadRequestError({ message: `${err.message}` });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError({ message: 'Фильма не существует' }))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: 'Невозможно удалить чужой фильм' });
      }
      movie.remove()
        .then(() => res.status(200).send({ message: 'Фильм удалена' }));
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return NotFoundError({ message: 'Фильм с таким id не найден' });
      }
      if (err.message === 'ForbiddenError') {
        return ForbiddenError({ message: 'Недостаточно прав' });
      }
      return next(err);
    });
};
