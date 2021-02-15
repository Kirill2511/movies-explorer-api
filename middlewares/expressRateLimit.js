const rateLimit = require('express-rate-limit');
const { CLIENT_ERROR } = require('../libs/statusMessages');

module.exports.limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: CLIENT_ERROR.TOO_MANY_REQUESTS },
});
