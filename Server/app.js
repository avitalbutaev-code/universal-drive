var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

app.use("/api/users/:id/files", require("./routes/files"));
app.use("/api/users/:id/folders", require("./routes/folders"));

module.exports = app;
