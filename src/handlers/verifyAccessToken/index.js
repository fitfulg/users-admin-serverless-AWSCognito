'use strict';
const cognito = require('../../services/cognito');
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));
  const { accessToken } = JSON.parse(event.body);

  try {
    const decoded = await cognito.verify(accessToken);

    return httpResponse(200, { result: decoded });
  } catch (err) {
    console.log('There was an error with verify access token');
    console.log(err.message);
    return httpResponse(401, { err: err });
  }
};
