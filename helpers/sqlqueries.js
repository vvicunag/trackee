const mysql = require("mysql2");


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cocodrilo69",
    database: "trackee_db"
});

const getEmployees = () => {
    conn.query("SELECT * FROM employees", (error, result) => {
        console.table(result);
    });
}

const getRoles = () => {
    conn.query("SELECT * FROM roles", (error, result) => {
        console.table(result);
    });
}

const getRolesChoices = () => {
    conn.query("SELECT * FROM roles", (error, result) => {
        console.log(result);
    });
};




const getDepartments = () => {
    conn.query("SELECT * FROM departments", (error, result) => {
        console.table(result);
    });
}




module.exports = {
    getEmployees,
    getRoles,
    getRolesChoices,
    getDepartments   
}