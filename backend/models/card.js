const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    maxlength: [30, 'Поле должно содержать максимум 30 символоа, вы ввели {VALUE}'],
    required: [true, 'Введите имя карточки'],
  },
  link: {
    type: String,
    required: [true, 'Введите ссылку на картинку карточки'],
    validate: {
      validator: (url) => isURL(url),
      message: 'Введите корректный URL адрес',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Не удалось получить информацию о собственнике карточки'],
    ref: 'user',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
