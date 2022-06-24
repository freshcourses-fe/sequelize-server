const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');


/* localhost:5000/api/users */
router.post('/users', UserController.createUser);
/* localhost:5000/api/users */
router.get('/users', () => {});

/* http://localhost:5000/api/users/5 */
router.get('/users/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;

  res.send(id);
});

router.post('/users', (req, res, next) => {
  const { body } = req;

  res.send(body);
});

module.exports = router;
