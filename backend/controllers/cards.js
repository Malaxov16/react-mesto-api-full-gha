/* eslint-disable linebreak-style */
/* eslint-disable no-useless-return */
/* eslint-disable eqeqeq */
const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AccessError = require('../errors/accessError');
const DefaultError = require('../errors/defaultError');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      // eslint-disable-next-line quotes
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      // eslint-disable-next-line eqeqeq
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для создания карточки.'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const _id = req.params.cardID;
  Card.findById(_id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new AccessError('Вы не владелец карточки.');
      }
      Card.findByIdAndDelete(_id)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(() => {
          next(new DefaultError('Ошибка удаления карточки.'));
          return;
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные карточки.'));
        return;
      }
      next(err);
    });
};

module.exports.setLike = (req, res, next) => {
  const _id = req.params.cardID;
  Card.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для установки лайка.'));
        return;
      }
      next(err);
    });
};

module.exports.unsetLike = (req, res, next) => {
  const _id = req.params.cardID;
  Card.findByIdAndUpdate(
    _id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
        return;
      }
      next(err);
    });
};
