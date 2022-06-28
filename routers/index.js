const express = require('express');
const userRouter = require('./user.router');
const chatRouter = require('./chat.router');

const router = express.Router();

router.use('/users', userRouter);
router.use('/chats', chatRouter);

module.exports = router;
