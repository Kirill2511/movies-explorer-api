const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthorizedError = require('../errors/401_UnauthorizedError');

const { min, max, requiredTrue } = require('../libs/validationParameters');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: min(2),
    maxlength: max(30),
    required: requiredTrue,
  },
  email: {
    type: String,
    required: requiredTrue,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не верный формат почты',
    },
  },
  password: {
    type: String,
    required: requiredTrue,
    minlength: min(8),
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError({ message: 'Неправильные почта или пароль' }));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError({ message: 'Неправильные почта или пароль' }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
