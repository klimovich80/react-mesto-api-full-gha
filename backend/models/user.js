const { Schema, model } = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcrypt');
const UnathorizedError = require('../errors/UnauthorizedError');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    maxlength: [30, 'Поле должно содержать максимум 30 символоа, вы ввели {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    maxlength: [30, 'Поле должно содержать максимум 30 символоа, вы ввели {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isURL(url),
      message: 'Введите корректный URL адрес',
    },
  },
  email: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения, введите email в формате mail@mail.any'],
    unique: [true, 'Этот email {VALUE} уже есть в базе данных'],
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    validate: {
      validator: (email) => isEmail(email),
      message: 'Email должен быть в формате me@there.any',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnathorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnathorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = model('user', userSchema);
