// переименуй
function fib(n) {
    let FibonacciNumbers = [1, 1];
   for (let i = 2; i <= n; i++) {
        FibonacciNumbers[i] = FibonacciNumbers[i-1] + FibonacciNumbers[i-2];
    }
    return FibonacciNumbers.at(-1);
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));

