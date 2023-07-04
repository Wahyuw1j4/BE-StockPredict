const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10, // Number of connections in the pool
  host: process.env.mysql_host,
  user: process.env.mysql_username,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
});

// Function to execute a query
const executeQuery = (query, params, callback) => {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err, null);
    } else {
      connection.query(query, params, function(err, results) {
        connection.release(); // Release the connection back to the pool
        callback(err, results);
      });
    }
  });
}
module.exports = {
  executeQuery,
};
