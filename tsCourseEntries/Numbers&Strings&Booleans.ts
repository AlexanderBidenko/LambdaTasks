function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('Incorrect input!');
    // }
    if (showResult) {
      console.log(phrase, n1 + n2);
    } else {
      return n1 + n2
    }
  }
  

let number1: number;
number1 = 5;
const number2 = 2.5;
const printResult = true;

const res = add(number1, number2, printResult, 'Result:');
