var express = require("express");
var router = express.Router();
const { checkVista, checkNivel } = require("../middlewares/auth.js");

const Pacientes = require("../controllers/pacientes.controller.js");
const Ordenes = require("../controllers/ordenes-ctrls/servicios.controller.js");
const Empleados = require("../controllers/empleados.controller.js");
const Examenes = require("../controllers/examenes.controller.js");

router.get("/", checkVista, async function (req, res, next) {
  try {
    const [pacientes, ordenes, empleados, examenes, cuantosPacientes, cuantasOrdenes] =
      await Promise.all([
        Pacientes.contarPacientes(),
        Ordenes.contarOrdenes(),
        Empleados.contarEmpleados(),
        Examenes.contarExamenes(),
        Pacientes.cuantosHoy(),
        Ordenes.cuantasHoy(),
      ]);

    res.render("index", {
      pagina: "inicio",
      total: { pacientes, ordenes, empleados, examenes },
      cuantos: {
        cuantosPacientes,
        cuantasOrdenes,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
