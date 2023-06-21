require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorHandler } = require('../controllers/errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const authError = new UnauthorizedError('Необходима авторизация');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorHandler(authError, next);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return errorHandler(authError, next);
  }

  req.user = payload;

  next();
};
