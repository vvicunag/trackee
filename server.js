const express = require("express");
const mysql = require("mysql2");
const cTable = require('console.table');

const app = express ();
const PORT = process.env.PORT || 2525;

app.use(express.urlencoded({extended: true}));

app.get("/api/departments", (req, res) => {
    conn.query("SELECT * FROM departments", (error, result) => {
        res.json(result);
    })
});

app.post("/api/add-movie", (req, res) => {
    //console.log(req.body);
    conn.query(
        `INSERT INTO movies (movie_name) VALUES (?)`, 
        req.body.movie,
        (err, result) => {
        res.json(result);
        console.log(result);
    });
});


app.listen(PORT, () => console.log("Server listening"));