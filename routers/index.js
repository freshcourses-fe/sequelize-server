const express = require('express');
const router = express.Router();

/* localhost:5000/api */
router.get('/', (req, res) => {
  res.send('ok from router');
});
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
