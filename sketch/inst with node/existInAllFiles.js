const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');


async function existInFile() {
    let set0 = new Set();
    let UsersFile = './instNicknames/out0.txt';
    const fileStream = fs.createReadStream(UsersFile);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      set0.add(line);
    }
    return set0;
}

async function existInAllFiles() {
    let uniqSet = await existInFile();
    let subSet = new Set();
    for (let i = 1; i < 20; i++) {
    let UsersFile = './instNicknames/out' + +i +'.txt';
    const fileStream = fs.createReadStream(UsersFile);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      if(uniqSet.has(line)){
      subSet.add(line);
      }
    }
    if (i != 19){
    uniqSet = new Set(subSet);
    subSet = new Set();
    }
    }
    return console.log(subSet.size)
  }
    
existInAllFiles();
