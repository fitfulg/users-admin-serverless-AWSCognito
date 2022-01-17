'use strict';
const cognito = require('../../services/cognito');
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event) => {
  const { email, refreshToken } = JSON.parse(event.body);

  try {
    //Send to cognito the signup request.
    let result = await cognito.renewToken(refreshToken, email);

    return httpResponse(200, { result });
  } catch (err) {
    console.log('There was an error with Renew Token');
    console.log(err.message);
    return httpResponse(500, { error: err });
  }
};
