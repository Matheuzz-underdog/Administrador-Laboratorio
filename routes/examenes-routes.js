const express = require("express");
const router = express.Router();
const control = require("../controllers/examenes-controller");
const examenes = require("../db/examenes-db");

// Es obvio lo que hace

router.get("/", async (req, res) => {
  try {
    const datos = await control.mostrarTodos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de exámenes guardados",
        data: [],
        total: 0,
      });
    }

    res.status(200).json({
      message: `Actualmente hay ${datos.length} exámenes registrados`,
      data: datos,
      total: datos.length,
    });
  } catch (err) {
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de examenes",
      detalle: err.message,
    });
  }
});

// Buscar por abreviartua

router.get("/:abbrev", async (req, res) => {
  try {
    const examenDeseado = await control.buscarExamenDeseado(req.params.abbrev);

    res.status(200).json({
      message: `Se encontró el examen con la abreviatura deseada`,
      data: examenDeseado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Ocurrio un error al buscar el examen",
      detalle: err.message,
    });
  }
});

// Crear nuevo examen

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const examCreado = await control.crearExamen(data);

    res.status(200).json({
      message: "Se ha creado exitosamente el objeto",
      data: examCreado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Se ha producido un error al intentar crear el elemento",
      detalle: err.message,
    });
  }
});

// Borar examen (por abreviatura)

router.delete("/", async (req, res) => {
  try {
    const examenEliminado = await control.eliminarExamen(req.body.abreviatura);

    res.status(200).json({
      message: "Examen eliminado exitosamente",
      data: examenEliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Se ha producido un error al eliminar el examen",
      detalle: err.message,
    });
  }
});

module.exports = router;
