const express = require("express");
const responseFormation = require("./responseFormation.js");


const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.post('/', urlencodedParser, function(request, response, next) {
     

  console.log((request.body).count);
  console.log(JSON.stringify(request.body));

  response.send(responseFormation(request.body))
  })

let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Booking app listening on port ' + port);
});

module.exports.app = app;