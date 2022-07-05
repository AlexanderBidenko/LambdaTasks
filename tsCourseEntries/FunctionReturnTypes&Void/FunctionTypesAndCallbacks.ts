function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printReesult(num: number): void {
    console.log('Result: ' + num);
}

// printReesult(add(5, 12));
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = add(n1, n2);
    cb(result);
}

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printReesult;
// combineValues = 5;

console.log(combineValues(5, 5));

// let someValue: undefined;

addAndHandle(10, 20, (result) => {
    console.log(result);
})
