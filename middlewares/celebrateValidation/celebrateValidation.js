const { celebrate, Joi } = require('celebrate');
const {
  email, password, name, _id, id, excessObjects,
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
  body: Joi.object().keys({ name })
    .messages(excessObjects),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({ _id })
    .messages(excessObjects),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({ id })
    .messages(excessObjects),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({ name })
    .messages(excessObjects),
});
