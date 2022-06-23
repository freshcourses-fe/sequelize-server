'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING(128),
      },
      lastName: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING(128),
      },
      email: { allowNull: false, unique: true, type: DataTypes.TEXT },
      password: { allowNull: false, type: DataTypes.STRING(256) },
      isMale: { field: 'is_male', type: DataTypes.BOOLEAN },
      birthday: { type: DataTypes.DATEONLY },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users'
    }
  );
  return User;
};
