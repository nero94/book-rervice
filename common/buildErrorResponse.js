module.exports = (error, statusCode = 500) => ({
  statusCode,
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify(error),
});
