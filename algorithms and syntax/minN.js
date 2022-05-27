// Find the First Number in Having a Certain Number of Divisors I
// 
// The number 12 is the first number in having six divisors, they are: 1, 2, 3, 4, 6 and 12.
//  Your challenge for this kata is to find the minimum number that has a certain number of
//  divisors. For this purpose we have to create the function

// find_min_num() or findMinNum() or similar in the other languages

// that receives the wanted number of divisors num_div, and outputs the smallest number having 
// an amount of divisors equals to num_div.


// Let's see some cases:

// find_min_num(10) = 48 # divisors are: 1, 2, 3, 4, 6, 8, 12, 16, 24 and  48
// find_min_num(12) = 60
// In this kata all the tests will be with numDiv < 80


function getSqrDivisors(n) {
    let Sqr = [];
    let i = 0;
    
    while ((i * i) <= n) {
        if (n % i === 0) {
            Sqr.push(i)
        }
        i++;
    }
    return Sqr;
}


function DivisorsCount(n) {
    let res = new Set()

    for (elem of getSqrDivisors(n)) {
        res.add((n / elem));
        res.add(elem);
    }
    return (res.size)
}

function findMinNum(n) {
    let o;
    if (getSqrDivisors(n).length == 1) {
    o = n * n;
      } else {
        o = n * Math.ceil(n / 3)
      }
    while (DivisorsCount(o) !== n) {
        o++;
    }
    return o;
}