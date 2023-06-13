const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');
const {
  validateUserUpdate,
  validateUserInfo,
  validateUserById,
  validateUserAvatar,
} = require('../middlewares/validate');

module.exports = router;

router.get('/', getUsers);

router.patch('/me', validateUserUpdate, updateUser);

router.get('/me', validateUserInfo, getUser);

router.get('/:userId', validateUserById, getUserById);

router.patch('/me/avatar', validateUserAvatar, updateAvatar);
