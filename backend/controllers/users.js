require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { errorHandler, OK_STATUS, CREATED_STATUS } = require('./errors');
const { SALT_ROUNDS } = require('../config');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => errorHandler(err, next));
};

const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => errorHandler(err, next));
};

const getUserById = (req, res, next) => {
  userModel.findById(req.params.userId)
    .orFail(() => { throw new Error.DocumentNotFoundError(); })
    .then((user) => { res.status(OK_STATUS).send(user); })
    .catch((err) => errorHandler(err, next));
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => userModel.create({
      ...req.body,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(CREATED_STATUS).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => errorHandler(err, next));
};

const updateUser = (req, res, next) => {
  userModel.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: false, // данные не будут валидированы перед изменением
  })
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => errorHandler(err, next));
};

const updateAvatar = (req, res, next) => {
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: false, // данные не будут валидированы перед изменением
    },
  )
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => errorHandler(err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => errorHandler(err, next));
};

module.exports = {
  getUsers, getUser, getUserById, createUser, updateUser, updateAvatar, login,
};
