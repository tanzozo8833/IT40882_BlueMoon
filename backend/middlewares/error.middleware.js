function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 400).json({ message: err.message || 'Bad Request' });
}

module.exports = errorHandler;
