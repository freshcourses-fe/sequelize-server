const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');


/* localhost:5000/api/users */
router.post('/users', UserController.createUser);
/* localhost:5000/api/users */
router.get('/users', UserController.findUsers);

/* http://localhost:5000/api/users/5 */
router.get('/users/:id', UserController.findUserById);

router.post('/users', (req, res, next) => {
  const { body } = req;

  res.send(body);
});

module.exports = router;
