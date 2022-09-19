const express = require("express");
const searchIpRange = require("./searchIpRange.js");


const app = express();

app.use(function(request, response) {
    
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    searchIpRange(ip).then(result => response.send(result));
  })

app.listen(8080);
