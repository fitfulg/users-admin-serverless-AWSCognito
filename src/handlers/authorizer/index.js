'use strict';
const { verify } = require('../../services/cognito');

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.handler = async (event, context, cb) => {
  console.log('Auth function invoked');
  //   console.log(iss);
  console.log(event);

  if (event.authorizationToken) {
    const token = event.authorizationToken;
    console.log(token);
    try {
      const decoded = await verify(token);
      cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
    } catch (err) {
      console.log('Unauthorized user:', err.message);
      cb('Unauthorized');
    }
  } else {
    console.log('No authorizationToken found in the header.');
    cb('Unauthorized');
  }
};
