const express = require("express");
const router = express.Router();
const detallesOrden = require("../controllers/ordenes-ctrls/detalles.controller");
const serviciosOrden = require("../controllers/ordenes-ctrls/servicios.controller");
const empleadosController = require("../controllers/empleados.controller");

// Ver todas las ordenes dentro de la database
router.get("/", async (req, res) => {
  try {
    if (req.query.buscar_orden) {
      // Buscar orden por paciente
      const cedulaBuscar = req.query.buscar_orden;
      const ordenEncontrada = await serviciosOrden.buscarOrden(cedulaBuscar);

      return res.status(200).json({
        message: "Se encontro la orden deseada",
        data: ordenEncontrada,
      });
    }
    // Si no hay query, muestra todo...
    const ordenesTotales = await serviciosOrden.todasOrdenes();

    if (ordenesTotales.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay ordenes guardadas",
        data: [],
        total: 0,
      });
    }
    res.status(200).json({
      message: `${ordenesTotales.length} ordenes encontradas`,
      total: ordenesTotales.length,
      data: ordenesTotales,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error en el servidor al buscar la(s) orden(es)",
      detalle: err.message,
    });
  }
});

// nuevo
router.post("/", async (req, res) => {
  try {
    const datos = req.body;
    const creado = await serviciosOrden.crearOrden(datos);

    res.status(200).json({
      message: "Orden creada",
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
      error: "Ocurrio un error al crear la orden",
      detalle: err.message,
    });
  }
});
//eliminar )si)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await serviciosOrden.eliminarOrden(id);

    res.status(200).json({
      message: "Orden eliminada",
      data: eliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al eliminar la orden",
      detalle: err.message,
    });
  }
});

//eliminar unicamente dun detaller
router.delete("/detalle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await detallesOrden.eliminarDetalle(id);

    res.status(200).json({
      message: "Orden eliminada",
      data: eliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al eliminar la orden",
      detalle: err.message,
    });
  }
});

module.exports = router;

// quiero dormir son las 2 de la mañana
