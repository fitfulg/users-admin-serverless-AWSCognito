'use strict';
const cognito = require('../../services/cognito');
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event) => {
  const { email, password, newPassword } = JSON.parse(event.body);

  try {
    //Send to cognito the signup request.
    let result = await cognito.changePassword(email, password, newPassword);

    return httpResponse(200, { result });
  } catch (err) {
    console.log('There was an error with Login');
    console.log(err.message);
    return httpResponse(500, { error: err.message });
  }
};
