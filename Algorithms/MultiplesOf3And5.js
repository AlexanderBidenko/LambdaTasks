// If we list all the natural numbers below 10 that are multiples of 3 or 5, 
// we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Finish the solution so that it returns the sum of all the multiples of 3 or 5
//  below the number passed in. Additionally, if the number is negative,
//  return 0 (for languages that do have them).
// Note: If the number is a multiple of both 3 and 5, only count it once.


function solution(number) {
    if (number < 0) {
        return 0
    } else {
        let max3 = (number - ((number-1) % 3)) / 3
        let max5 = (number - ((number-1) % 5)) / 5
        let ls = new Set()
        for (let i = 0; i <= max3; i++) {
            ls.add(i*3)
        }
        for (let i = 0; i <= max5; i++) {
            ls.add(i*5)
        }
        ls = [...ls]
        console.log(ls)
        let res = 0
        for (let i = 0; i < ls.length; i++) {
            res += ls[i]
        }
        console.log(res)
    }
}
