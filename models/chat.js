'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ User }) {
      // UserChat
      // UserId , ChatId
      Chat.belongsToMany(User, {
        through: 'users_to_chats',
        foreignKey: 'chatId',
      });
    }
  }
  Chat.init(
    {
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      imagePath: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Chat',
      underscored: true,
      tableName: 'chats',
    }
  );
  return Chat;
};
