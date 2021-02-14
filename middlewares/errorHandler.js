const { SERVER_ERROR } = require('../libs/statusMessages');

module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send({ message: SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
  if (next) next();
};
