const express = require("express");
const router = require("./router/router.js");
const errorHandler = require("./middleware/error-handler.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

module.exports = app;

//Improvements
// Optimizing Data Model
// Saperate Cart Model from User
// Use Population to populate "user data in reviews" -- "cart with items along with quantity"
