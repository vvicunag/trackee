const inquirer = require("inquirer"); 
const cTable = require('console.table');

const initialQuestion = 
[
    {
        type: 'list',
        message: 'Do you want to add an employee?',
        choices: ['Yes', 'No'],
        name: 'addEmployee',
    },  
]

getEngineerData = (employeeData) => {
    inquirer.prompt({
        type: 'input',
        message: 'What is the GitHub of this engineer?',
        name: 'engineerGithub',
    }).then((response) => {
        console.log(response);
    })
}

getEngineerData();



/*console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// prints
name  age
----  ---
foo   10
bar   20*/