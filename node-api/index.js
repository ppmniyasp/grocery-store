const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Create MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database!");
    }
});

// Middleware to parse JSON
app.use(express.json());

// GET API to fetch all users
app.get("/users/:id?", (req, res) => {
    let userId = req.params.id ? parseInt(req.params.id) : 0; // Convert to integer

    db.query("CALL GetUsersJSON(?)", [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Instead of parsing, return the JSON directly
            const usersJson = results[0][0].users_json;
            res.json(usersJson); // Return directly
        }
    });
});

// **POST Route - Authenticate & Fetch User (Hidden Data)**
app.post("/users/login", (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    db.query("CALL loginproc(?, ?)", [name, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results[0].length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.json(results[0][0]); // Return user details
    });
});
``
// Start the server and listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    console.log(`🌍 Access API from another device: http://192.168.1.6:${PORT}/users`);
});
