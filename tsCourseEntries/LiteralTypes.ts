function combine(input1: number | string, 
                input2: number | string,
                resultConversion: 'as-number' | 'as-text') {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;
    return result;
  } 
    result = input1.toString() + input2.toString();
    return result;
}

const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);

const combineNames = combine('Max', 'Anna', 'as-text');
console.log(combineNames);
