var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index.js");
var usersRouter = require("./routes/pacientes-routes.js");
const { readFile } = require("fs");

var app = express();

const pjson = require("./package.json");

// Determina si esta en production o development (Recuerda consultar al profesor si esto se usa/se hace asi)
process.argv[2] = "dev";

if (process.argv[2] && process.argv[2] === "dev") {
  process.env.NODE_ENV = "development";
  console.log(`> DEV | ${pjson.name}. ${pjson.version}`.red);
} else {
  process.env.NODE_ENV = "production";
  console.log(`PRODUCTION | ${pjson.name}. ${pjson.version}`.yellow);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
