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


const createEmployeeQuestions = async () => {
  const roles = await getAllRoles();
  return [
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
  {
    type: 'list',
    message: "What is the role of the employee?",
    choices: roles.map(({title}) => title),
    name: 'roles',
  },
]
};

initializeApp = () => {
    inquirer.prompt(initializeQuestion).then( async (response) => {
        console.log(response);
        if(response.initialize == "See employees") {
            const [employees] = await queries.getEmployees();
            console.table(employees);
            initializeApp();
        };
        if(response.initialize == "See roles") {
          const roles = await getAllRoles();
          console.table(roles);
          initializeApp();
        };
        if(response.initialize == "See departments") {
          const [departments] = await queries.getDepartments();
          console.table(departments);
          initializeApp();
        };
        if(response.initialize == "Add employee") {
          addEmployee();
        };
    });
};
 

const getAllRoles = async () => {
  const [roles] = await queries.getRoles();
  return roles;
}

const addEmployee = async () => {
  inquirer.prompt(await createEmployeeQuestions()).then((response) => {
    console.log(response);
  });
}



initializeApp();


