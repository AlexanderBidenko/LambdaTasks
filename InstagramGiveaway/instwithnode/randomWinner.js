const fs = require('fs');
const readline = require('readline');


let mass = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
function randomArray(array) {
  for (let i = 0; i < array.length; i++) {
  let rand = Math.floor(Math.random()*array.length);
  temp1 = mass[i];
  mass[i] = mass[rand];
  mass[rand] = temp1;
}
  return array.slice(0,11);
}
const randomArr = randomArray(mass);

async function existInFile() {
  let set0 = new Set();
  let UsersFile = './instNicknames/out' + randomArr[0] + '.txt';
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

async function randomWinner() {
  let uniqSet = await existInFile();
  let subSet = new Set();

  for (let i = 1; i < 11; i++) {
  let UsersFile = './instNicknames/out' + +randomArr[i] + '.txt';
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

  if (i != 10){
  uniqSet = new Set(subSet);
  subSet = new Set();
  }
  }
  
  return ([...subSet][Math.floor(Math.random()*[...subSet].length)]);
}

module.exports = randomWinner;