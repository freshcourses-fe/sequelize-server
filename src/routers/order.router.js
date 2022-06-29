const express = require('express');
const OrderController = require('../controllers/order.controller');

const orderRouter = express.Router();

/* localhost:5000/api/users/X/orders */
orderRouter.post('/', OrderController.createOrder);

orderRouter.post('/v2', OrderController.createMagicOrder);

orderRouter.get('/', OrderController.getOrders);
orderRouter.get('/v2', OrderController.getMagicOrders);

orderRouter.get('/:orderId', OrderController.getOrder);
orderRouter.put('/:orderId', OrderController.updateOrder);
orderRouter.delete('/:orderId', OrderController.deleteOrder);

module.exports = orderRouter;
