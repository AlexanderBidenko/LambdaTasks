function add(n1: number, n2: number): number{
    return n1 + n2;
}

function printReesult(num: number): void {
    console.log('Result: ' + num);
}

printReesult(add(5, 12));


let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printReesult;
// combineValues = 5;

console.log(combineValues(5, 5));

// let someValue: undefined;