const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// for static fies
app.use("/uploads", express.static("public/uploads"));

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/category", categoryRoutes);

module.exports = app;
