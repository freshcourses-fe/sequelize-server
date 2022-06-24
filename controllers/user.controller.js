const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};
