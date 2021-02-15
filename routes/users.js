const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getUser, updateUser,
} = require('../controllers/users.js');

router.get('/users/me', getUser);
router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
