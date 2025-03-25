const db = require("../config/db");

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    try {
        // Run the stored procedure
        const [result] = await db.execute("CALL loginproc(?, ?)", [name, password]);

        console.log("Raw MySQL Output:", result); // DEBUGGING STEP

        // Verify result format
        if (!result || result.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Extract user data
        const users = result[0][0]; // Adjust this based on the actual output

        if (!users || users.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.json(users); // Return user details
    } catch (err) {
        console.error("Database Query Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { loginUser };
