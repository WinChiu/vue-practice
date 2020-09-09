const express = require("express");
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "z2v4wxa4d92rulpo",
    password: "g3uqk5s2wyvtoq3r",
    port: 3306,
    database: "vsine0ibs4j6lk5u",
});

const router = express.Router();

//Get Post
router.get("/", async (req, res) => {
    let data = await get_data("testdata");
    res.send(data);
});

// Add post
router.post("/", async (req, res) => {
    var sql = `INSERT INTO testdata (id ,text) VALUES ('3','${req.body.text}')`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
    var sql = `DELETE FROM testdata WHERE id = '${req.params.id}'`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
});

function get_data(name) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${name}`, function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;
