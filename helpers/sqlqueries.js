let conn;
const mysql = require("mysql2/promise");
const initdb = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cocodrilo69",
    database: "trackee_db",
  });
};

const getEmployees = async () => {
  const result = await conn.execute(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.dep_name, manager_id
    FROM employees e
    JOIN roles r ON e.id = r.id
    JOIN departments d ON r.department_id = d.id;`
  );
  /*console.log(
    result[0].map(async (employee) => {
      if (employee.manager_id) {
        const showSelectedManager = await conn.execute(
          `SELECT e.first_name, e.last_name 
       FROM employees e WHERE e.id=?`,
          [employee.manager_id]
        );
        console.log(showSelectedManager);
      }
    })
  );*/
  return result;
};

const getRoles = () => {
  return conn.execute(
    `SELECT r.id, r.title, r.salary, d.dep_name
    FROM roles r
    JOIN departments d ON r.department_id = d.id `
  );
};

const getDepartments = () => {
  return conn.execute("SELECT * FROM departments");
};

const addSelectedEmployee = (response) => {
  return conn.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
    "${response.firstName}",
    "${response.lastName}",
    ${response.role},
    ${response.manager}
  ) `);
};

const addSelectedDepartment = (response) => {
  conn.execute(
    `INSERT INTO departments (dep_name) VALUES ("${response.department}")`
  );
};

const addSelectedRole = (response) => {
  conn.execute(
    `INSERT INTO roles (title, salary, department_id) VALUES (
        "${response.title}", 
        ${response.salary}, 
        ${response.department}
        )`
  );
};

const updateSelectedRole = (response) => {
  conn.execute(
    `UPDATE roles
    SET title = "${response.title}",
    salary = ${response.salary},
    department_id = ${response.department}
    WHERE id = ${response.roles}`
  );
};

module.exports = {
  getEmployees,
  getRoles,
  getDepartments,
  initdb,
  addSelectedDepartment,
  addSelectedRole,
  addSelectedEmployee,
  updateSelectedRole,
};
