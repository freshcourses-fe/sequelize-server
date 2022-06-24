const { User } = require('../models');

module.exports.findUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
