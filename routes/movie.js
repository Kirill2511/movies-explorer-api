const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie.js');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
