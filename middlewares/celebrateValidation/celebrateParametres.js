const { Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  string, number, empty, min, max, required, emailMessage, excess, alphanum, length, uri,
} = require('../../libs/joiMessages');

const uriCustomScheme = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(uri);
  }
  return value;
};

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
  .min(6)
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
  .number()
  .required()
  .messages({
    'number.base': number,
    'number.empty': empty,
    'any.required': required,
  });

module.exports.country = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

module.exports.director = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

module.exports.duration = Joi
  .number()
  .required()
  .min(1)
  .max(1000000)
  .messages({
    'number.base': number,
    'number.empty': empty,
    'number.min': min,
    'number.max': max,
    'any.required': required,
  });

module.exports.year = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

module.exports.description = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

module.exports.image = Joi
  .required()
  .messages({
    'string.empty': empty,
    'any.required': required,
  });

module.exports.trailerLink = Joi
  .string()
  .required()
  .custom(uriCustomScheme)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.custom': uri,
    'any.required': required,
  });

module.exports.nameRU = Joi
  .string()
  .required()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.nameEN = Joi
  .string()
  .required()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.updated_at = Joi
  .string()
  .required()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.created_at = Joi
  .string()
  .required()
  .min(2)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'any.required': required,
  });

module.exports.movieId = Joi
  .string()
  .hex()
  .length(24)
  .messages({
    'string.base': string,
    'string.length': length,
    'any.required': required,
  });

module.exports.excessObjects = {
  'object.unknown': excess,
};
