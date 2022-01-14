'use strict';
const cognito = require('../../services/cognito');
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event) => {
  const { email, code } = JSON.parse(event.body);

  try {
    // Send to cognito the sign up request.
    let data = await cognito.verifyCode(email, code);

    return httpResponse(200, { result: data });
  } catch (err) {
    console.log('There was an error with verifyCode: ', err);
    return httpResponse(500, { error: err.message });
  }
};
