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

module.exports.excessObjects = {
  'object.unknown': excess,
};
