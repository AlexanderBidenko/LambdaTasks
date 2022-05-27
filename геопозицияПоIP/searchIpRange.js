const fs = require('fs/promises');

function IpConvert(ip) {
  ip = ip.split('.');
  ip = (+ip[0] * 16777216 + +ip[1] * 65536 + +ip[2] * 256 + +ip[3])

  return ip;
}


async function importDB() {
  try {
    const data = await fs.readFile('./IP2LOCATION-LITE-DB1.CSV', { encoding: 'utf8' });
    return data.split('\n');
  } catch (err) {
    console.log(err);
  }
}
  

async function searchIpRange(ip) {
    ip = IpConvert(ip);
    const data = await importDB().then(result => {return result});
    let res;
    let start = 0;
    let end = data.length
    let middle;
    let found = false;
    while (found === false && start <= end) {
      middle = Math.floor((start + end) / 2);
    if (((Number((data[middle].split(','))[0].slice(1,-1))) <= ip) && ((Number((data[middle].split(','))[1].slice(1,-1))) >= ip)) {
            found = true;
            res = data[middle].split(',');
            return JSON.parse(`{"Range":[${res[0].slice(1,-1)}, ${res[1].slice(1,-1)}], "Сountry code": ${res[2]}, "Country": ${res[3]}}`)
        }
    else if (ip < (Number(((data[middle].split(','))[0].slice(1,-1))))) {
        end = middle - 1;
    } else {
        start = middle + 1;
    }
  }
}


module.exports = searchIpRange;