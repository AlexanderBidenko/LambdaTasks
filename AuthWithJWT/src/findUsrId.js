const jwt = require('jsonwebtoken');

const secret = require('../conf.js');


async function findUserId(data) {
  try {
    const accessTokenPayload = jwt.decode(data, secret);

    const accessTokenJSON = JSON.parse(accessTokenPayload.data);
    return accessTokenJSON.userId;

  } catch(err) {
    console.log(err);
  }
}


module.exports = findUserId;