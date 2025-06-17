// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('[ERROR]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
