function IpConvert(ip) {
    ip = ip.split('.');
    ip = (+ip[0] * 16777216 + +ip[1] * 65536 + +ip[2] * 256 + +ip[3])
    return ip;
}


function searchDBpart(ip) {
    const arrayDBparts = require("./DB/arrayDBparts.js");

    let start = 0;
    let end = arrayDBparts.length
    let middle;
    let found = false;

    while (found === false && start <= end) {
        middle = Math.floor((start + end) / 2);
        if ((arrayDBparts[middle][1] <= ip) && (arrayDBparts[middle][2] >= ip)) {
                found = true;
                return ("./DB/" + arrayDBparts[middle][0]);
                }
        else if (ip < arrayDBparts[middle][1]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
}


function searchIpRange(ip) {
    let res;
    ip = IpConvert(ip);

    const DBipRange = require(searchDBpart(ip));

    let start = 0;
    let end = DBipRange.length
    let middle;
    let found = false;

    while (found === false && start <= end) {
        middle = Math.floor((start + end) / 2);
        if ((DBipRange[middle][0] <= ip) && (DBipRange[middle][1] >= ip)) {
                found = true;
                res = DBipRange[middle];
                }
        else if (ip < DBipRange[middle][0]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return res;
}


module.exports = searchIpRange;
