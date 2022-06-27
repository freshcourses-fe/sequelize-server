'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Order }) {
      // define association here
      User.hasMany(Order, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          isAlpha: true,
          notEmpty: true,
          notNull: true,
          len: [1, 128],
        },
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          isAlpha: true,
          notEmpty: true,
          notNull: true,
          len: [1, 128],
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(256),
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          notNull: true,
        },
      },
      isMale: { field: 'is_male', type: DataTypes.BOOLEAN },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: true,
          isDate: true,
          isValidDate: value => {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('Bad date');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users',
    }
  );
  return User;
};
