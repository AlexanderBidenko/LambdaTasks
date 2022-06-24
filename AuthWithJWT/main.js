const express = require('express');
const bodyParser = require('body-parser');

const appendUser = require('./src/appendUsr.js');
const loginUser = require('./src/loginUsr.js');
const findUserId = require('./src/findUsrId.js');
const RefreshAccessToken = require('./src/refreshAccessToken.js');
const requestAccess = require('./src/requestAccess.js');

const app = express();
const BodyParserJSON = bodyParser.json();


app.post('/sing_up', BodyParserJSON, async function(request, response){
       try {
            const isSing_up = await appendUser(request.body);
            response.send(isSing_up);
        } catch (e) {
            console.log(e);
        }
})

app.post('/login', async function(request, response){
    try {
        let pass = request.query.password;
        let userEmail = request.query.email;
        let isAuth = await loginUser({ email: userEmail, password: pass});

        response.send(isAuth);
     } catch (e) {
         console.log(e);
     }
});


app.post('/refresh', async function(request, response){
    try {
        const access_token = await RefreshAccessToken(request.headers.authorization.split(' ')[1]);

        response.send(access_token);
     } catch (e) {
        if (e.name === 'TokenExpiredError') {
            response.status(401).send('Unauthorised');
        } else {
            response.send('Unexpected error');
        }
    }
});

app.get('/me', async function(request, response) {
    UserId = await findUserId(request.headers.authorization.split(' ')[1])
    response.redirect(`me${UserId}`)
});

app.get('/me[0-9]', async function(request, response) {
    const access = await requestAccess(request.headers.authorization.split(' ')[1]);
    response.send(access);
});

let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports.app = app;