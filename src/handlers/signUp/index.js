'use strict';

const cognito = require('../../services/cognito');
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event) => {
  const { name, email, password } = JSON.parse(event.body);
  try {
    // Send to cognito the sign up request.
    let data = await cognito.signUp(name, email, password);

    //Make response.
    let response = {
      username: data.user.username,
      id: data.user.userSub,
      success: true,
    };

    return httpResponse(200, { result: response });
  } catch (err) {
    console.log('There was an error with signUp: ', err);
    return httpResponse(500, { error: err.message });
  }
};
