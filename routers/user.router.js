const express = require('express')
const UserController = require('../controllers/user.controller');
const { findUser } = require('../middlewares/userMW');
const orderRouter = require('./order.router');

const userRouter = express.Router();

/* localhost:5000/api/users */
userRouter.post('/', UserController.createUser);
/* localhost:5000/api/users */
userRouter.get('/', UserController.findUsers);

/* http://localhost:5000/api/users/5 */
userRouter.get('/:userId', UserController.findUserById);

userRouter.put('/:userId', UserController.updateUser);

userRouter.delete('/:userId', UserController.deleteUser);

userRouter.put('/v2/:userId', findUser, UserController.updateUserv2);

userRouter.delete('/v2/:userId', findUser, UserController.deleteUserv2);

userRouter.use('/:userId/orders', findUser, orderRouter);

module.exports = userRouter;