let conn
const mysql = require("mysql2/promise");
( async () => {
conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cocodrilo69",
    database: "trackee_db"
});
}) ();

const getEmployees =  () => {
    const result = conn.execute("SELECT * FROM employees");
    return result;
}

const getRoles = () => {
    return conn.execute("SELECT * FROM roles");
}

const getDepartments = () => {
    return conn.execute("SELECT * FROM departments")
}

module.exports = {
    getEmployees,
    getRoles,
    getDepartments   
}
