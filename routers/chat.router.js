const chatRouter = require('express').Router();
const multer = require('multer');

const ChatController = require('../controllers/chat.controller');
const { findUser } = require('../middlewares/userMW');
const { imagePath } = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({ storage });
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
