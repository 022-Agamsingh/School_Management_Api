import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const database = await mysql.createConnection({
  host: process.env.HOST ,
  user: process.env.USER ,
  password: process.env.PASSWORD ,
  database: process.env.DATABASE ,
});
console.log("Connected to the database");

// await database.execute("CREATE DATABASE SchoolDB");
console.log(await database.execute("show databases"));

await database.execute("CREATE TABLE IF NOT EXISTS schools (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), latitude DECIMAL(10, 8), longitude DECIMAL(11, 8))");

export default database;
