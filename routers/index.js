const express = require('express');
const userRouter = require('./user.router');
const chatRouter = require('./chat.router');

/* localhost:5000/api */
const router = express.Router();


/* localhost:5000/api/users */
router.use('/users', userRouter);

/* localhost:5000/api/chats */
router.use('/chats', chatRouter);

module.exports = router;
