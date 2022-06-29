const chatRouter = require('express').Router();

const ChatController = require('../controllers/chat.controller');
const { findUser } = require('../middlewares/userMW');
const imageUpload = require('../utils/imagesUpload');

/* localhost:5000/api/chats */

chatRouter.post('/', ChatController.createChat);
chatRouter.get('/', ChatController.getChats);
chatRouter.get('/:chatId', ChatController.getChat);

chatRouter.post(
  '/:chatId/users/:userId',
  findUser,
  ChatController.addUserToChat
);

chatRouter.post(
  '/:chatId/images',
  imageUpload.single('image'),
  ChatController.addImage
);

module.exports = chatRouter;
