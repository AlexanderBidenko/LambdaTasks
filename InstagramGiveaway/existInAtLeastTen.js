const fs = require('fs');
const readline = require('readline');

//для выбора случайных 10 файлов
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
function randomArray(array) {
  for (let i = 0; i < array.length; i++) {
    let rand = Math.floor(Math.random() * array.length);
    temp1 = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp1;
  }
  return array.slice(0,11);
}


const randomArr = randomArray(arr);

async function existInFile() {
  let set0 = new Set();
  let usersFile = './instNicknames/out' + randomArr[0] + '.txt';
  const fileStream = fs.createReadStream(usersFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    set0.add(line);
  }

  return set0;
}


async function existInAtLeastTen() {
  let uniqSet = await existInFile();
  let subSet = new Set();
  for (let i = 1; i < 11; i++) {
    let usersFile = './instNicknames/out' + +randomArr[i] + '.txt';
    const fileStream = fs.createReadStream(usersFile);
    
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity 
    });

    for await (const line of rl) {
      if (uniqSet.has(line)) {
        subSet.add(line);
      }
    }

    if (i != 10) {
      uniqSet = new Set(subSet);
      subSet = new Set();
    }
  }
  return subSet.size;
}


module.exports = existInAtLeastTen;
