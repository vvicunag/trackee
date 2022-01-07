const inquirer = require("inquirer");
const cTable = require("console.table");
const queries = require("./helpers/sqlqueries");
const res = require("express/lib/response");

// Question bank
const initializeQuestion = [
  {
    type: "list",
    message: "What do you want to do?",
    choices: [
      "See employees",
      "See roles",
      "See departments",
      "Add employee",
      "Add department",
      "Add role",
      "Update role",
      "Quit",
    ],
    name: "initialize",
  },
];

const createEmployeeQuestions = async () => {
  const roles = await getAllRoles();
  const employees = await getAllEmployees();
  return [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the role of the employee?",
      choices: roles.map(({ title, id }) => {
        return { name: title, value: id };
      }),
      name: "role",
    },
    {
      type: "list",
      message: "Who is the manager for this employee?",
      choices: employees.map(({ first_name, last_name, id }) => {
        return { name: first_name + " " + last_name, value: id };
      }),
      name: "manager",
    },
  ];
};

const createRoleQuestions = async () => {
  const departments = await getAllDepartments();
  return [
    {
      type: "input",
      message: "What is the title of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What is the department of the role?",
      choices: departments.map(({ dep_name, id }) => {
        return { name: dep_name, value: id };
      }),
      name: "department",
    },
  ];
};

const createUpdateRollQuestions = async () => {
  const roles = await getAllRoles();
  const departments = await getAllDepartments();
  return [
    {
      type: "list",
      message: "What role do you want to update?",
      choices: roles.map(({ title, id }) => {
        return { name: title, value: id };
      }),
      name: "roles",
    },
    {
      type: "input",
      message: "What is the title of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What is the department of the role?",
      choices: departments.map(({ dep_name, id }) => {
        return { name: dep_name, value: id };
      }),
      name: "department",
    },
  ];
};

const runApp = async () => {
  const response = await inquirer.prompt(initializeQuestion);

  console.log(response);
  if (response.initialize == "See employees") {
    const employees = await getAllEmployees();
    console.table(employees);
    runApp();
  }
  if (response.initialize == "See roles") {
    const roles = await getAllRoles();
    console.table(roles);
    runApp();
  }
  if (response.initialize == "See departments") {
    const departments = await getAllDepartments();
    console.table(departments);
    runApp();
  }
  if (response.initialize == "Add employee") {
    addEmployee();
  }
  if (response.initialize == "Add department") {
    addDepartment();
  }
  if (response.initialize == "Add role") {
    addRole();
  }
  if (response.initialize == "Update role") {
    updateRoll();
  }
};

const getAllEmployees = async () => {
  const [employees] = await queries.getEmployees();
  return employees;
};

const getAllRoles = async () => {
  const [roles] = await queries.getRoles();
  return roles;
};

const getAllDepartments = async () => {
  const [departments] = await queries.getDepartments();
  return departments;
};

const addEmployee = async () => {
  inquirer.prompt(await createEmployeeQuestions()).then((response) => {
    queries.addSelectedEmployee(response);
    runApp();
  });
};

const addDepartment = async () => {
  await inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "department",
    })
    .then((response) => {
      queries.addSelectedDepartment(response);
      runApp();
    });
};

const addRole = async () => {
  inquirer.prompt(await createRoleQuestions()).then((response) => {
    queries.addSelectedRole(response);
    runApp();
  });
};

const updateRoll = async () => {
  inquirer.prompt(await createUpdateRollQuestions()).then((response) => {
    queries.updateSelectedRole(response);
    runApp();
  });
};

const intializeApp = async () => {
  await queries.initdb();
  runApp();
};

intializeApp();
