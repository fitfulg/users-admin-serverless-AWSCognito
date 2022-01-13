'use strict';
const { httpResponse } = require('../../services/http');

module.exports.handler = async (event) => {
  const output = {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    userPoolId: process.env.USER_POOL_ID,
    userPoolClient: process.env.APP_CLIENT_ID,
    region: process.env.REGION,
    input: event,
  };

  return httpResponse(200, output);
};
