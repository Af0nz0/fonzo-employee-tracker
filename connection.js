const mysql = require("mysql2");

//connection pool
const pool = mysql.createPool({
  host: "127.0.01",
  port: 3306, 
  user: "root",
  password: "Alfonso430",
  database: "employee_tracker", 
  connectionLimit: 10,
});


module.exports = pool;
