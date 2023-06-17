const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../config');
const { errorHandler } = require('../controllers/errors');
const { cli } = require('winston/lib/winston/config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const authError = new UnauthorizedError('Необходима авторизация');
  console.log('authorization attempt');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('no authorization header');
    return errorHandler(authError, next);
  }
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return errorHandler(authError, next);
  }

  req.user = payload;

  next();
};
