const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/400_BadRequestError');
const NotFoundError = require('../errors/404_NotFoundError');
const ConflictError = require('../errors/409_ConflictError');
const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError({ message: CLIENT_ERROR.AUTHENTICATION });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({ message: CLIENT_ERROR.CONFLICT });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        _id: user._id, email: user.email,
      },
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        ),
      })
        .send({ message: SUCCESS.AUTHORIZATION });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id === 'me' ? req.user : req.user._id)
    .orFail(new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError({ message: CLIENT_ERROR.USER_NOT_FOUND });
      }
      throw err;
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      } throw new BadRequestError({ message: `${err.message}` });
    })
    .catch(next);
};
