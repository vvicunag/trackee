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
  return result;
};

const getRoles = async () => {
  const result = await conn.execute(
    `SELECT r.id, r.title, r.salary, d.dep_name
    FROM roles r
    JOIN departments d ON r.department_id = d.id `
  );
  return result;
};

const getDepartments = async () => {
  const result = await conn.execute("SELECT * FROM departments");
  return result;
};

const addSelectedEmployee = async (response) => {
  const result =
    await conn.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (
    "${response.firstName}",
    "${response.lastName}",
    ${response.role},
    ${response.manager}
  ) `);
  return result;
};

const addSelectedDepartment = async (response) => {
  const result = await conn.execute(
    `INSERT INTO departments (dep_name) VALUES ("${response.department}")`
  );
  return result;
};

const addSelectedRole = async (response) => {
  const result = await conn.execute(
    `INSERT INTO roles (title, salary, department_id) VALUES (
        "${response.title}", 
        ${response.salary}, 
        ${response.department}
        )`
  );
  return result;
};

const updateSelectedRole = async (response) => {
  const result = await conn.execute(
    `UPDATE roles
    SET title = "${response.title}",
    salary = ${response.salary},
    department_id = ${response.department}
    WHERE id = ${response.roles}`
  );
  return result;
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
