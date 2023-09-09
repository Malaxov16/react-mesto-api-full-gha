/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  idUserValidator,
  updateUserValidator,
  updateUserAvatarValidator,
} = require('../middlewares/validate');

router.get('/', getUsers); // получить всех пользователей
router.get('/me', getCurrentUser); // получить текущего пользователя
router.get('/:userID', idUserValidator, getUser); // получить пользователя по id
router.patch('/me', updateUserValidator, updateUserInfo); // обновить информацию о пользователе-владельце
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar); // обновить аварат пользователя-владельца

module.exports = router;
