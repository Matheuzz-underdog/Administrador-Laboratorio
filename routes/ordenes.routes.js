const express = require("express");
const router = express.Router();
const detallesOrden = require("../controllers/ordenes-ctrls/detalles.controller");
const serviciosOrden = require("../controllers/ordenes-ctrls/servicios.controller");

// Ver todas las ordenes dentro de la database
router.get("/", async (req, res) => {
  try {
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
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de ordenes",
      detalle: err.message,
    });
  }
});

// Buscar orden por id (importante guardar la id de cada orden creada)
router.get("/:", async (req, res) => {
  try {
    const idABuscar = req.query.id;
    const ordenEncontrada = await serviciosOrden.buscarOrden(idABuscar);

    res.status(200).json({
      message: "Se encontro la orden deseada",
      data: ordenEncontrada,
    });

  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al intentar buscar la orden",
      detalle: err.message,
    });
  }
});

module.exports = router;
