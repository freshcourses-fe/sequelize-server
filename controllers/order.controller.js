const createHttpError = require('http-errors');
const { Order } = require('../db/models');

module.exports.createOrder = async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;

    const order = await Order.create({ userId });

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.createMagicOrder = async (req, res, next) => {
  try {
    const { user } = req;

    const order = await user.createOrder({});

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;
    const orders = await Order.findAll({ where: { userId } });

    if (!orders) {
      return next(createHttpError(404, 'Orders not found'));
    }

    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getMagicOrders = async (req, res, next) => {
  try {
    const { user } = req;
    const orders = await user.getOrders();

    if (!orders) {
      return next(createHttpError(404, 'Orders not found'));
    }

    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrder = async (req, res, next) => {
  try {
    const {
      params: { orderId },
      user: { id: userId },
    } = req;

    const order = await Order.findOne({ where: { id: orderId, userId } });

    if (!order) {
      return next(createHttpError(404, 'Order not found'));
    }

    res.send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrder = async (req, res, next) => {
  try {
    const {
      body,
      params: { orderId },
    } = req;

    const [updatedCount, [order]] = await Order.update(body, {
      where: { id: orderId },
      returning: true,
    });

    if (updatedCount !== 1) {
      return next(createHttpError(404, 'Order not found'));
    }

    res.send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const {
      params: { orderId },
      user: { id: userId },
    } = req;

    const deletedCount = await Order.destroy({
      where: { id: orderId, userId },
    });

    if (deletedCount !== 1) {
      return next(createHttpError(404, 'Order not found'));
    }

    res.send({ data: { id: orderId } });
  } catch (error) {
    next(error);
  }
};
