const jwt = require('jsonwebtoken');

const secret = require('./conf.js');


async function findUserId(data) {
  try {
    const AccessTokenPayload = jwt.decode(data, secret);

    const AccessTokenJSON = JSON.parse(AccessTokenPayload.data);
    return AccessTokenJSON.userId;

  } catch(err) {
    console.log(err);
  }
}


module.exports = findUserId;