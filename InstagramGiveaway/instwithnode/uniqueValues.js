const fs = require('fs');
const readline = require('readline');


async function uniqueValues() {
  let uniqSet = new Set();
  
  for (let i = 0; i < 20; i++) {
  let UsersFile = './instNicknames/out' + +i +'.txt';
  const fileStream = fs.createReadStream(UsersFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    uniqSet.add(line);
  }
  }

  return uniqSet.size
}

module.exports = uniqueValues;

