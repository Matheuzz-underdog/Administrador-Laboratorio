const express = require("express");
const router = express.Router();
const Controller = require("../controllers/resultados.controller");

// muestra todos los resultados
// si
router.get("/", async (req, res) => {
  try {
    if (req.query.buscar_detalle) {
      const id = req.query.buscar_detalle;
      const resultado = await Controller.buscarResultado(id);
      return res.status(200).json({
        message: `Encontrado el Resultado`,
        data: resultado,
      });
    }
    const resultados = await Controller.todosResultados();
    res.status(200).json({
      message: `${resultados.length} resultados encontrados`,
      total: resultados.length,
      data: resultados,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de resultados",
      detalle: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const borrado = await Controller.borrarResultado(id);

    res.status(200).json({
      message: `Se ha borrado el resultado`,
      data: borrado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al intentar borrar el resultado",
      detalle: err.message,
    });
  }
});

// Crear un resultado resultante resultadiriji;o
router.post("/", async (req, res) => {
  try {
    const datos = req.body;
    const creado = await Controller.crearResultado(datos);

    res.status(200).json({
      message: `Se ha creado un nuevo resultado`,
      data: creado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al intentar crear la nueva orden",
      detalle: err.message,
    });
  }
});

module.exports = router;
