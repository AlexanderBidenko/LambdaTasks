function fib(n) {
    let FibonacciNumbers = [1, 1];
   for (let i = 2; i <= n; i++) {
        FibonacciNumbers[i] = FibonacciNumbers[i-1] + FibonacciNumbers[i-2];
    }
    return FibonacciNumbers.at(-1);
}
