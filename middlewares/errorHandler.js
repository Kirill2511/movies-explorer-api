module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send({ message: 'Что-то пошло не так.' });
  }
  if (next) next();
};
