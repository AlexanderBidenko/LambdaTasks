import {router} from './src/router'


const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


export function chatingWithUser() {

    rl.question('Hello enter 10 words or digits deviding them in spaces:', function (data) {
        if (data === 'exit') {process.exit(0)}


        data = data.split(" ")

        rl.question(`How would you like to sort values: \n
    1. Words by name (from A to Z).
    2. Show digits from the smallest.
    3. Show digits from the bigest.
    4. Words by quantity of leters.
    5. Only unique words.
    6. Only unique numbers.
    7. Unique values
        
    Select (1-7) and press ENTER:`, async function (task) {
        if (task === 'exit') {process.exit(0)}
        else {
            const result = await new router().routes(task, data)
            console.log(result)
        }
            chatingWithUser()
        });
    });
}


chatingWithUser()
