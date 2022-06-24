const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const { findUser } = require('../middlewares/userMW');

/* localhost:5000/api/users */
router.post('/users', UserController.createUser);
/* localhost:5000/api/users */
router.get('/users', UserController.findUsers);

/* http://localhost:5000/api/users/5 */
router.get('/users/:id', UserController.findUserById);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

router.put('/users/v2/:id', findUser, UserController.updateUserv2);

router.delete('/users/v2/:id', findUser, UserController.deleteUserv2);

module.exports = router;
