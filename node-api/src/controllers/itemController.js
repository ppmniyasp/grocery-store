const item = require("../models/item");

const getItem = async (req, res) => {

    const Id = Number(req.body.id);

    if (Id === null || Id === undefined) {
        return res.status(400).json({ error: "item id is required" });
    }

    try {
        let result;

        if (Id===0){
            result = await item.findAll();
        }else{
            result = await item.findByPk(Id);
            if (!result) {
                return res.status(404).json({ error: "No item found" });
            }
        }

        res.json(result);
    } catch (err){
        console.error("Error fetching items : ",err)
        res.status(500).json({ error : err.message });
    }
};



