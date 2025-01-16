//import mysql2
const mysql = require('mysql2/promise');
// Prepare connection parameters we use to connect to the database 
const dbConfig = { 
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
// DB_HOST = 127.0.0.1
// DB_USER = abegeragapp
// DB_PASS = LPDtHrQnR9p3ErRL
// DB_NAME = abegeragapp

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Prepare a function that will execute the SQL queries asynchronously

async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  }
  // Export the query function for use in the application 
  module.exports = { query };