const { Error } = require('mongoose');
const cardModel = require('../models/card');
const { errorHandler, OK_STATUS, CREATED_STATUS } = require('./errors');
const NotOwnerError = require('../errors/NotOwnerError');

const getCards = ((req, res, next) => {
  cardModel.find({})
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch((err) => errorHandler(err, next));
});

const createCard = (req, res, next) => {
  cardModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch((err) => errorHandler(err, next));
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .orFail(() => { throw new Error.DocumentNotFoundError(); })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NotOwnerError('Эту карточку может удалить только ее владелец');
      }
      cardModel.findByIdAndRemove(req.params.cardId).catch((err) => errorHandler(err, next));
      res.status(OK_STATUS).send(card);
    })
    .catch((err) => errorHandler(err, next));
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new Error.DocumentNotFoundError(); })
    .then((card) => res.status(OK_STATUS).send(card))
    .catch((err) => errorHandler(err, next));
};

const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new Error.DocumentNotFoundError(); })
    .then((card) => res.status(OK_STATUS).send(card))
    .catch((err) => errorHandler(err, next));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
