const mongoose = require('mongoose');
const validator = require('validator');

const { requiredTrue } = require('../libs/validationParameters');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: requiredTrue,
  },
  nameEN: {
    type: String,
    required: requiredTrue,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: requiredTrue,
  },
  thumbnail: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  trailer: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  image: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  description: {
    type: String,
    required: requiredTrue,
  },
  year: {
    type: String,
    required: requiredTrue,
  },
  duration: {
    type: String,
    required: requiredTrue,
  },
  director: {
    type: String,
    required: requiredTrue,
  },
  country: {
    type: String,
    required: requiredTrue,
  },
});

module.exports = mongoose.model('movie', movieSchema);
