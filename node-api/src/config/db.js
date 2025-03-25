const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
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
(async () => {

    try{
        const connection = db.getConnection();
        console.log("Connected to MySQL database!");
        connection.release(); // Release connection
    }
    catch (err) {
        console.error("Database connection failed:", err);
    } 
});

// Sequelize ORM Connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set true to see raw SQL logs
});

// Test Sequelize Connection
sequelize.authenticate()
    .then(() => console.log("Sequelize connected to MySQL"))
    .catch(err => console.error("Sequelize connection error:", err));

module.exports = { db, sequelize};
