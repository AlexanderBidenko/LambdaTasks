const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = require('./conf.js');


async function requestAccess(access_token) {
    try {
        const AccessTokenPayload = jwt.verify(access_token, secret);

        const AccessTokenJSON = JSON.parse(AccessTokenPayload.data);
        console.log(AccessTokenJSON)
        let reqNum = ((Number(fs.readFileSync(`./reqData/${access_token}.txt`))) + 1).toString();

        fs.writeFile(`./reqData/${access_token}.txt`, reqNum, () => {});
        reqNum = Number(reqNum);

        return {data: {username: AccessTokenJSON.username}};

    } catch(e) {
        if (e.name === 'TokenExpiredError') {
            const AccessTokenPayload = jwt.decode(access_token, secret);

            const AccessTokenJSON = JSON.parse(AccessTokenPayload.data);
            console.log(AccessTokenJSON)
        let reqNum = ((Number(fs.readFileSync(`./reqData/${access_token}.txt`))) + 1).toString();

        fs.writeFile(`./reqData/${access_token}.txt`, reqNum, () => {});
        reqNum = Number(reqNum);

        return {request_num: reqNum, data: {username: AccessTokenJSON.username}};
        }
    }
}

module.exports = requestAccess;