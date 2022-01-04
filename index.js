const inquirer = require("inquirer"); 
const cTable = require('console.table');
const queries = require("./helpers/sqlqueries");

// Question bank
const initializeQuestion = 
[
    {
        type: 'list',
        message: 'What do you want to do?',
        choices: ['See employees', 'See roles','See departments', 'Add employee', 'Quit'],
        name: 'initialize',
    },  
]


const addEmployeeQuestions =
[
  {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'first-name',
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'last-name',
  },  
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'last-name',
  },
/*  {
    type: 'list',
    message: "What is the role for the employee?",
    choices: [],  create an array on top with the choices
    name: 'last-name',
  },*/
]

initializeApp = () => {
    inquirer.prompt(initializeQuestion).then((response) => {
        console.log(response);
        if(response.initialize == "See employees") {
            queries.getEmployees();
            initializeApp();
        };
        if(response.initialize == "See roles") {
          queries.getRoles();
          initializeApp();
        };
        if(response.initialize == "See departments") {
          queries.getDepartments();
          initializeApp();
        };
        if(response.initialize == "Add employee") {
          addEmployee();
        };
    });
}


const addEmployee = () => {
  inquirer.prompt(addEmployeeQuestions).then((response) => {
    console.log(response);
  });
}



//initializeApp();

const showmeRoles = () => {
  queries.getRolesChoices();
};

showmeRoles();