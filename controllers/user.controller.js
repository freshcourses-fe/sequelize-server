const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    user.password = undefined;

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      where: { firstName: 'Test' },
    });

    // const users = await User.findAll({
    //   attributes: ['email', 'firstName', 'lastName']
    // });

    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

