var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var loginRouter = require("./routes/login");
var usersRouter = require("./routes/users");
var app = express();
app.use(cors());
var register = require("./routes/register");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/register", register);
module.exports = app;
