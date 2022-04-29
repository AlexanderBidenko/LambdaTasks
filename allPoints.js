/*
All possible options for placing dots between letters.
For example:
'abc' --> ['abc', 'ab.c', 'a.bc', 'a.b.c'] 
*/

function variation(string) {
  let result = [];
  let countPositions = string.length - 1;
  let countSub;
  let bin;
  let subStr = '';
  for (let i = 0; i < (2 ** countPositions); i++) {
    bin = (i).toString(2);      
    countSub = countPositions - bin.length;
    bin = '0'.repeat(countSub) + bin;
    subStr = '';
    for (let i = 0; i < countPositions; i++) {
      subStr += string[i];
      if (bin[i] === '1') {
        subStr += '.';
      }
    }
    subStr += string[countPositions];
    result.push(subStr);
  }
  return result;
}

