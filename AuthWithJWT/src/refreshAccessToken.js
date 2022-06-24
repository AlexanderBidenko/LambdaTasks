const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = require('../conf.js');


async function RefreshAccessToken(refresh_token) {
    try {
    const RefreshTokenDecoded = jwt.verify(refresh_token, secret);
    const RefreshTokenJSON = JSON.parse(RefreshTokenDecoded.data);

    const access_token = jwt.sign({
        exp: (Math.floor((Date.now() / 1000) + (Math.random() * 30 + 30))),
        data: `{"username": "${RefreshTokenJSON.username}", "userId": "${RefreshTokenJSON.userId}"}`
    }, secret);

    fs.writeFile(`./reqData/${access_token}.txt`, '0', () => {});

    return {acc: access_token}
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = RefreshAccessToken;