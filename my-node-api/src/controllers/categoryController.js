const db = require("../config/db");

const getCategory = async (req, res) => {
    const categoryId = req.params.id ? parseInt(req.params.id) : 0;

    try {

        let result;

        if (categoryId === 0){
            [result] = await db.execute("SELECT * FROM categorymst;");
        }else{
            [result] = await db.execute("SELECT * FROM categorymst WHERE id = ?;",[categoryId]);
        }

        console.log("Raw MySQL Output:", result); // DEBUGGING STEP

        const category = result;

        if (!Array.isArray(category) || category.length === 0) {
            return res.status(404).json({ error: "No category found" });
        }

        res.json(category); // ✅ Return extracted user liste
    } catch (err) {
        console.error("Database Query Error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCategory };
