const fs = require('fs');


const f1 = 16777216;
const f2 = 65536;
const f3 = 2**8;
// console.log(f1*193+f2*201+f3*105+40)
// (a - a%b)/b
console.time('op')

let line;
let subArr = 4294967294;
let subb = [];
fs.readFile('./IP2LOCATION-LITE-DB1.CSV', 'utf8', (err, data) => {
    data = data.split('\n');
    for (let i = 1; i < data.length; i++) {
        let a = Number(((data[i].split(','))[0].slice(1,-1)));
        let b = Number(((data[i].split(','))[1].slice(1,-1)));
        if (a < subArr) {
            if (b > subArr) {
                console.log(data[i].split(','));
                break
            }
        }
    }
    return (console.log(subb), console.timeEnd('op'));
});


