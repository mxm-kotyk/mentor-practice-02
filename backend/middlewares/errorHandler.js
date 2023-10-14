module.exports = (err, req, res, next) => {
  const statusCode = err.code || res.statusCode || res.code || 500;
  res.status(statusCode);
  res.json({ code: statusCode, stack: err.stack });
};
