import {router} from '../src/router';
const fs = require("fs");
const readline = require('readline');
const util = require('util');



export function interactionSimulation(pathIn:string, pathOut: string){

let logFile = fs.createWriteStream(pathOut, { flags: 'a' });
let logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

const fileStream = fs.createReadStream(pathIn);

const rl = readline.createInterface({
input: fileStream,
output: logStdout
});

function chatingWithUser() {

    rl.question('Hello enter 10 words or digits deviding them in spaces:', function (data) {
        if (data === 'exit') {process.exit(0)}


        data = data.split(" ")

        rl.question(`How would you like to sort values: \n
    1. Words by name (from A to Z).
    2. Show digits from the smallest.
    3. Show digits from the bigest.
    4. Words by quantity of leters.
    5. Only unique words.
    6. Only unique numbers.
    7. Unique values
        
    Select(1-7) and press ENTER:`, function (task) {
        if (task === 'exit') {process.exit(0)}
        else {
            // new router().forwardInitialData(task, data)
        }
            chatingWithUser()
        });
    });
}
chatingWithUser()
}
