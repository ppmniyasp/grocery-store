const mysql = require("mysql2/promise");
require("dotenv").config();

// Create MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10, // Allows multiple queries
});

// Connect to MySQL
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database!");
        connection.release(); // Release connection
    }
});

module.exports = db;
