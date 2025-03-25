const express = require("express");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/", getUsers); // Get all users or single user by ID

module.exports = router;
