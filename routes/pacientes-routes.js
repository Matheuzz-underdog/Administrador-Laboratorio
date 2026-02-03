const express = require("express");
const router = express.Router();

const control = require("../controllers/pacientes-controller");

router.get("/", control.mostrarTodos);

router.post("/", control.crearPaciente);

router.post("/buscar", control.buscarPorCedula);

router.get("/ultimos", control.ultimosCinco);

router.get("/:id", control.buscarPorID);

router.put("/:cedula", control.actualizarPaciente);

module.exports = router;
