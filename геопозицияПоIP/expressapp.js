const express = require("express");
const searchIpRange = require("./searchIpRange.js");


const app = express();
app.use(function(request, response, next) {
     
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    // let ipInfo = searchIpRange(ip);
    searchIpRange(ip).then(result => {
        return response.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>ip info</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <h2>Range: ${Number(result[0].slice(1,-1))} - ${Number(result[1].slice(1,-1))}</h2>
          <h2>${result[2].slice(1,-1)}: ${result[3].slice(1,-2)}</h2>
        </body>
        <html>`) 
      });
})


app.listen(8080);

