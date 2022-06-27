const { Order } = require('../models');

module.exports.createOrder = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const order = await Order.create({ userId });

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.createMagicOrder = async (req, res, next) => {
  try {
    const {user} = req;

    const order = await user.createOrder({});

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};
