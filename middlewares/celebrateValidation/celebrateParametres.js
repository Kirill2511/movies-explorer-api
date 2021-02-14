const { Joi } = require('celebrate');

const {
  string, empty, min, max, required, emailMessage, excess, alphanum, length,
} = require('../../libs/joiMessages');

module.exports.email = Joi
  .string()
  .required()
  .email()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.email': emailMessage,
    'any.required': required,
  });

module.exports.password = Joi
  .string()
  .required()
  .min(8)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.name = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports._id = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.id = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.movieId = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
  });

module.exports.country = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.director = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.duration = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.year = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.description = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.image = Joi
  .string()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.trailer = Joi
  .string()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.thumbnail = Joi
  .string()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.nameRU = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.nameEN = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
  });

module.exports.excessObjects = {
  'object.unknown': excess,
};
