const { celebrate, Joi } = require('celebrate');
const { httpRegExp, emailRegExp } = require('../validation/validate');

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2)
      .max(30)
      .regex(emailRegExp)
      .required(),
    password: Joi.string().min(2).required(),
  }),
});

const validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().email().min(2)
      .max(30)
      .regex(emailRegExp)
      .required(),
    password: Joi.string().min(2).required(),
    avatar: Joi.string().uri().regex(httpRegExp),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2).max(30)
      .required()
      .regex(emailRegExp),
  }),
});

const validateUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().min(2).regex(httpRegExp),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required().regex(httpRegExp),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserLogin,
  validateUserRegistration,
  validateUserUpdate,
  validateUserInfo,
  validateUserById,
  validateUserAvatar,
  validateCard,
  validateCardId,
};
