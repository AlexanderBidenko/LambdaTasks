import {router} from './src/router'


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function chatingWithUser() {

    rl.question('Hello enter 10 words or digits deviding them in spaces:', function (data) {
        if (data === 'exit') {process.exit(0)}
        // асинк 
        data = data.split(" ")

        rl.question(`How would you like to sort values: \n
    1. Words by name (from A to Z).
    2. Show digits from the smallest.
    3. Show digits from the bigest.
    4. Words by quantity of leters.
    5. Only unique words.
    6. Only unique numbers.
    7. Unique values
        
    Select(1-7) and press ENTER:`, function (task) {
        if (task === 'exit') {process.exit(0)}
        else {
            new router().forwardInitialData(task, data)
        }
            chatingWithUser()
        });
    });
}


chatingWithUser()
