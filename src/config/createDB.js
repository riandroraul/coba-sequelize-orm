const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const data = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
};
const connection = mysql.createConnection(data);

connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  function (err, results) {
    console.log("result : ", results);
    console.log("Error : ", err);
  }
);

connection.end();
