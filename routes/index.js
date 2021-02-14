const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movie');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/celebrateValidation/celebrateValidation');
const NotFoundError = require('../errors/404_NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth, usersRouter);
router.use(auth, moviesRouter);

router.use('/*', () => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
