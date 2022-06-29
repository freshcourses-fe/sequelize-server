require('dotenv').config();
const express = require('express');
const { imagePath } = require('./constants');
const { basicEH, sequelizeUniqueEH } = require('./middlewares/error.handlers');

const router = require('./routers');
const app = express();

app.use(express.json());
app.use('/images', express.static(imagePath));
/* localhost:5000/api */
app.use('/api', router); // - подключили роутер на все маршруты

app.use(sequelizeUniqueEH);
app.use(basicEH);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
