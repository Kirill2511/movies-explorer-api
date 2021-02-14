const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/celebrateValidation/celebrateValidation');
const {
  getUser, updateUser,
} = require('../controllers/users.js');

router.get('/me', getUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
