const express = require("express");
const searchIpRange = require("./searchIpRange.js");

 
const app = express();
app.use(function(request, response, next) {
     
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    let ipInfo = searchIpRange(ip);
    response.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>ip info</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h4>Range: ${ipInfo[0]} - ${ipInfo[1]}</h4>
        <h3>${ipInfo[2]}: ${ipInfo[3]}</h3>
    </body>
    <html>`)
});


app.listen(8080);

