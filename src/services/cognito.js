const AmazonCognitoId = require('amazon-cognito-identity-js');

//Set fetch, because aws cognito lib was created for browsers.
global.fetch = require('node-fetch');

//Set user pool credentials.
const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.APP_CLIENT_ID,
};

const userPool = new AmazonCognitoId.CognitoUserPool(poolData);

//Register a new user, and return the data in a promise.
const signUp = (name, email, password) => {
  return new Promise((result, reject) => {
    try {
      //Create an attribute list.
      const attributeList = [];

      //Set user an email.
      attributeList.push(
        new AmazonCognitoId.CognitoUserAttribute({ Name: 'name', Value: name }),
      );
      attributeList.push(
        new AmazonCognitoId.CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
      );

      //Register new user in cognito.
      userPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) reject(err);
        else result(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//Very the registration code.
const verifyCode = (username, code) => {
  return new Promise((resolve, reject) => {
    const userPool = new AmazonCognitoId.CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoId.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  signUp,
  verifyCode,
};
