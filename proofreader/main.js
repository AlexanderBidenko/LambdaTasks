const express = require("express");
const responseFormation = require("./responseFormation.js");


const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.post('/', urlencodedParser, function(request, response, next) {
  
  try {
    response.send(responseFormation(request.body));
  } catch (e) {
    console.log(e)
  }

})

let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports.app = app;