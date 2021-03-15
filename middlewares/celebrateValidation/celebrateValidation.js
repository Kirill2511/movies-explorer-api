const { celebrate, Joi } = require('celebrate');
const {
  email,
  password,
  name,
  _id,
  excessObjects,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU,
  nameEN,
  movieId,
  // eslint-disable-next-line camelcase
  updated_at,
  // eslint-disable-next-line camelcase
  created_at,
} = require('./celebrateParametres');

//
module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email, password, name,
  })
    .messages(excessObjects),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({ email, password })
    .messages(excessObjects),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
    updated_at,
    created_at,
  })
    .messages(excessObjects),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({ _id })
    .messages(excessObjects),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({ movieId })
    .messages(excessObjects),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({ name, email })
    .messages(excessObjects),
});
