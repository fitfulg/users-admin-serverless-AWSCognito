const httpResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body, null, 2),
});

module.exports.httpResponse = httpResponse;
