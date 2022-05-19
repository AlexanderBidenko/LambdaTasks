const express = require("express");
const fs = require("fs");
const searchIpRange = require("./searchIpRange")
 
const app = express();
app.use(function(request, response, next) {
     
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    
    searchIpRange(ip).then(() => {
    fs.readFile(ip + '.txt', 'utf8', (err, data) => {
        let res = (data.split('\n'))
        return response.send res
    })
    })
});
app.listen(8080);