const { db } = require("../config/db");

const getUsers = async (req, res) => {

    const { Id } = req.body;
    if (Id === null || Id === undefined) {
        return res.status(400).json({ error: "User id is required" });
    }

    try {
        const [result] = await db.execute("CALL GetUsersJSON(?)", [Id]);

        const users = result[0];

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.json(users); // Return extracted user liste
    } catch (err) {
        console.error("Database Query Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsers };
