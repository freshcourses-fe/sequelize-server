const createHttpError = require('http-errors');
const { Chat, User } = require('../models');

module.exports.createChat = async (req, res, next) => {
  try {
    const {
      body: { userId, ...restBody },
    } = req;

    const chat = await Chat.create(restBody);

    const user = await User.findByPk(userId);

    if (!user) {
      return next(createHttpError(404, 'user not found'));
    }

    await chat.addUser(user);

    res.status(201).send({ data: chat });
  } catch (error) {
    next(error);
  }
};

module.exports.getChats = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: [
        {
          model: User,
          as: 'participants',
          attributes: ['email', 'id', 'firstName', 'lastName'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!chats) {
      return next(createHttpError(404, 'Chats not found'));
    }

    res.send({ data: chats });
  } catch (error) {
    next(error);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const {
      params: { chatId },
    } = req;

    const chat = await Chat.findByPk(chatId, { include: User });

    if (!chat) {
      return next(createHttpError(404, 'Chat not found'));
    }

    // const usersInChat = await chat.getUsers();

    // res.send({ data: {chat, users: usersInChat} });

    res.send({ data: chat });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToChat = async (req, res, next) => {
  try {
    const {
      user,
      params: { chatId },
    } = req;

    const chat = await Chat.findByPk(chatId);

    if (!chat) {
      return next(createHttpError(404, 'Chats not found'));
    }

    await chat.addParticipant(user);

    res.send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};
