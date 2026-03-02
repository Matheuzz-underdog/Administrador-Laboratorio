const express = require("express");
const router = express.Router();
const control = require("../controllers/examenes.controller");

// Es obvio lo que hace

router.get("/", async (req, res) => {
  try {
    if (req.query.abreviatura) {
      const abreviatura = req.query.abreviatura;
      const examenDeseado = await control.buscarExamenDeseado(abreviatura);
      return res.status(200).json({
        message: `Se encontró el examen con la abreviatura deseada`,
        data: examenDeseado,
      });
    }

    const datos = await control.mostrarTodos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de exámenes guardados",
        data: [],
        total: 0,
      });
    }
    res.status(200).json({
      message: `Datos encontrados`,
      cantidad: datos.length,
      data: datos,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error",
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

router.delete("/:abrev", async (req, res) => {
  try {
    const abreviatura = req.params.abrev;
    const examenEliminado = await control.eliminarExamen(abreviatura);

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
