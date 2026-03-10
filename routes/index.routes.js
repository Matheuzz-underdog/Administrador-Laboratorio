var express = require("express");
var router = express.Router();
const { checkVista } = require("../middlewares/auth.js");

/* GET home page. */
router.get("/", checkVista, function (req, res, next) {
  res.render("index", { title: "laboratorio-name-placeholder" });
});

module.exports = router;
