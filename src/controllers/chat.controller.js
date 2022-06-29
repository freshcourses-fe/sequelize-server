const createHttpError = require('http-errors');
const { Chat, User } = require('../db/models');

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

    await chat.addParticipant(user);

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

module.exports.addImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { chatId },
    } = req;


    const [updatedCount, [chat]] = await Chat.update(
      { imagePath: filename },
      { where: { id: chatId }, returning: true }
    );

    if (updatedCount !== 1) {
      return next(createHttpError(404, 'Chats not found'));
    }

    res.send({ data: chat });
  } catch (error) {
    next(error);
  }
};
    /*
      "fieldname": "image",
  "originalname": "FRESHCODE - logo.png",
  "encoding": "7bit",
  "mimetype": "image/png",
  "destination": "/home/work/Documents/fc/fe2021-2/lections/sequelize-server/public/images",
  "filename": "2739f02444d427838c1f38d6dffcd07f",
  "path": "/home/work/Documents/fc/fe2021-2/lections/sequelize-server/public/images/2739f02444d427838c1f38d6dffcd07f",
  "size": 5241
    */