const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateUserLogin, validateUserRegistration } = require('../middlewares/validate');

router.post('/signin', validateUserLogin, login);

router.post('/signup', validateUserRegistration, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
