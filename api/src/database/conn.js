const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "MySQL_2002",
  database: "bonificacoes",
});

module.exports = con;