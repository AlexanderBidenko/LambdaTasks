const express = require("express");
const bodyParser = require('body-parser')
const responseFormation = require("./responseFormation.js");


const app = express();

const BodyParserJSON = bodyParser.json();

app.post('/', BodyParserJSON, function(request, response) {
  
  try {
    response.send(responseFormation(request.body));
  } catch (e) {
    console.log(e);
  }

})

let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports.app = app;