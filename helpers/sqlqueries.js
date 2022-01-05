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

const getEmployees = () => {
  const result = conn.execute("SELECT * FROM employees");
  return result;
};

const getRoles = () => {
  return conn.execute("SELECT * FROM roles");
};

const getDepartments = () => {
  return conn.execute("SELECT * FROM departments");
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

module.exports = {
  getEmployees,
  getRoles,
  getDepartments,
  initdb,
  addSelectedDepartment,
  addSelectedRole,
};
