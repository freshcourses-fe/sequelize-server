require('dotenv').config();
const express = require('express');
const { UniqueConstraintError } = require('sequelize');

const router = require('./routers');
const app = express();

app.use(express.json());

/* localhost:5000/api */
app.use('/api', router); // - подключили роутер на все маршруты

app.use(async (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    return res.status(409).send({ errors: [err] });
  }

  next(err);
});

app.use(async (err, req, res, next) => {
  // console.dir(err);
  const status = err.status || 500;

  res.status(status).send({ errors: [err] });
});

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
