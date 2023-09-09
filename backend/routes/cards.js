/* eslint-disable linebreak-style */
const router = require('express').Router();

const {
  getCard, createCard, deleteCard, setLike, unsetLike,
} = require('../controllers/cards');
const { idCardValidator, createCardValidator } = require('../middlewares/validate');

router.get('/', getCard);
router.post('/', createCardValidator, createCard);
router.delete('/:cardID', idCardValidator, deleteCard);
router.put('/:cardID/likes', idCardValidator, setLike);
router.delete('/:cardID/likes', idCardValidator, unsetLike);

module.exports = router;
