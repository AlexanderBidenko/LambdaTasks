import * as express from 'express';
const bodyParser = require('body-parser');

import {actinsWithDB} from './src/actionsWithDB';

const DB = new actinsWithDB()

const app = express() ;
const bodyParserJSON = bodyParser.json();


app.post('/*[A-Za-z0-9_]', bodyParserJSON, async function(request, response): Promise <void> {
    let route : string = request.url
    route = route.slice(1,)
    const date = request.body;

    DB.appendDate(route, date);

    response.send(request.body);
})


app.get('/*[A-Za-z0-9_]', async function(request, response): Promise <void> {
    let route : string = request.url
    route = route.slice(1,)

    let UsersDate = await DB.findUsersDate(route);

    response.send(UsersDate)
})


let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports.app = app;