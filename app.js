const express = require("express");
require("express-async-errors");
require("dotenv").config();
const morgan = require("morgan");
const router = require("./router/router.js");
const errorHandler = require("./middleware/error-handler.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", router);
app.use("/public", express.static("public"));
app.use(errorHandler);

module.exports = app;
