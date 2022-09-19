/* 
Convert number to reversed array of digits
Given a random non-negative number,
 you have to return the digits of this number within an array in reverse order.

Example:
348597 => [7,9,5,8,4,3]
0 => [0] 
*/


(n) => {
    let arr = String(n);
    arr = arr.split('').reverse();
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Number(arr[i]);
    }
    return arr;
  }
