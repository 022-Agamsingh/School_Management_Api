import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool for better serverless performance
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
});

// Create table if it doesn't exist
async function initializeDatabase() {
    try {
        await pool.execute("CREATE TABLE IF NOT EXISTS schools (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), latitude DECIMAL(10, 8), longitude DECIMAL(11, 8))");
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Database initialization error:", error);
    }
}

// Initialize database
initializeDatabase();

export default pool;
