const express = require("express");
const { getCategory } = require("../controllers/categoryController");

const router = express.Router();

router.post("/", getCategory);

module.exports = router;