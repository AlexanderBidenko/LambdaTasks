const inquirer = require('inquirer');
const fs = require('fs');
const os = require('os');
const readline = require('readline');
let user = ``;


try {
    appendUser();
  } catch (e) {
    console.log(e);
  }


function appendUser() {

  inquirer.prompt([
  {
    name: 'name',
    type : 'input',
    message : "For appendig user`s data, firstly write username (for exit press ENTER)",
    validate(userName) {
      if (userName.length > 50) {
        return 'Too many chars in username.';
      }
      return true;
    },
  },
])
  .then((answers) => {
    if (answers.name === '') {
      askAboutSearchingUser();
      return
  } else {
    user += `${os.EOL}{user: '${answers.name}', `,
      appendUserGender();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("// Prompt couldn't be rendered in the current environment");
    } else {
      console.log(error);
    }
  });
}


function appendUserGender() {

  inquirer.prompt([
    {
      name: 'gender',
      type : 'list',
      message : "Choose user gender:",
      choices : [
        'Female',
        'Male'
      ]
    }
  ])
    .then((answers) => {
      user += `gender: '${answers.gender}' `
      appendUserAge();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("// Prompt couldn't be rendered in the current environment");
      } else {
        console.log(error);
      }
    });
  }
  

  function appendUserAge() {

    inquirer.prompt([
      {
        name: 'age',
        type : 'input',
        message : "Enter user age:",
        validate(age) {
          if ((Number(age) > 240) || ((Number(age) < 0)) || ((isNaN(Number(age)) === true))) {
            return 'Invalid value';
          }
          return true;
        },
      }
    ])
      .then((answers) => {
        if (answers.age === '') {
          user += `} ${os.EOL},`;
          fs.appendFileSync('./db.txt', user);

          appendUser();

        } else {
          user += `, age: '${answers.age}'} ${os.EOL},`;
          fs.appendFileSync('./db.txt', user);

          appendUser();
          }
        })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("// Prompt couldn't be rendered in the current environment");
        } else {
          console.log(error);
        }
      });
    }
    

function askAboutSearchingUser() {

  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'search',
      message: 'Would you like to find a user (by username)?',
    }
  ])
  .then(answers => {
    if (answers.search === true) {
      askUserNameToSearch();
    } else {return}
  });
}


function askUserNameToSearch() { 

  let db = './db.txt';
  const connectingToDB = fs.createReadStream(db);
  inquirer.prompt([
  {
    name: 'name',
    type : 'input',
    message : "Input user name: (for exit press ENTER)",
    validate(text) {
      if (text.length > 50) {
        return 'Too long name.';
      }
      return true;
    },
  },
])
  .then((answers) => {
    if (answers.name !== '') {
    let res = searchUserCB(answers.name, connectingToDB)
    res.then(result => {
      if (result.size > 0) {
        result.forEach(user => {
          console.log(user);
        });
      } else {
        console.log('User not found');
      }
    
    })
  } else {
    return
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("// Prompt couldn't be rendered in the current environment");
    } else {
      console.log(error);
    }
  });
  }


function searchUserCB(userName, connectingToDB) {
  
  return new Promise (async (resolve) => {
  const rl = readline.createInterface({
    input: connectingToDB,
    crlfDelay: Infinity
  });
  let res = new Set();
  for await (const line of rl) {
    if (line.includes(`user: '${userName}'`) === true) {
      res.add(line);
    }
  }
  resolve(res);
  })
}


module.exports = appendUser;