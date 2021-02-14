const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validateRegister, validateLogin } = require('../middlewares/celebrateValidation/celebrateValidation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

module.exports = router;
