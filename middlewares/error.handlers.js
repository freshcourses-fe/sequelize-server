const { UniqueConstraintError } = require('sequelize');

module.exports.sequelizeUniqueEH = async (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    return res.status(409).send({ errors: [err] });
  }

  next(err);
};

module.exports.basicEH = async (err, req, res, next) => {
  // console.dir(err);
  const status = err.status || 500;

  res.status(status).send({ errors: [err] });
};
