const item = require("../models/item");

const createItem = async (req, res) => {
    const itemToInsert = req.body;

    if (!itemToInsert || Object.keys(itemToInsert).length === 0){
        return res.status(400).json({ error: "item details is required"})
    }

    try{
        const createdItem = await item.create(itemToInsert);
        res.json(createdItem);
    }catch (err){
        console.error("Error creating item : ",err)
        res.status(500).json({ error : err.message });
    }
};

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

module.exports = { getItem, createItem };



