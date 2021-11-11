// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_database'
    },
    console.log(`Connected to the employee_database database.`)
  );

  module.exports = {db}