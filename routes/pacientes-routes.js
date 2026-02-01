var express = require("express");
var router = express.Router();

const control = require("../controllers/pacientes-controller");

router.get("/", control.mostrarTodos);

router.post("/", control.agregarPaciente);

router.get("/", control.buscarPorCedula);

router.get("/:id)", control.buscarPorID);

module.exports = router;
