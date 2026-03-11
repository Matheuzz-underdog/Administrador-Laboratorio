const express = require("express");
const router = express.Router();
const detallesOrden = require("../controllers/ordenes-ctrls/detalles.controller");
const serviciosOrden = require("../controllers/ordenes-ctrls/servicios.controller");

const { checkLogin, checkNivel, checkVista } = require("../middlewares/auth");

// Ver todas las ordenes dentro de la database
router.get(
  "/",
  checkVista,
  checkNivel("lector", "editor", "admin"),
  async (req, res) => {
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
      if (req.query.buscar_detalle) {
        const detalleBuscar = req.query.buscar_detalle;
        const ordenEncontrada = await serviciosOrden.buscarPorID(detalleBuscar);

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
      res.render("ordenes", { datos: ordenesTotales });
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
  },
);

// nuevo
router.post(
  "/",
  checkLogin,
  checkNivel("editor", "admin"),
  async (req, res) => {
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
  },
);
//eliminar )si)
router.delete(
  "/:id",
  checkLogin,
  checkNivel("editor", "admin"),
  async (req, res) => {
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
  },
);

//eliminar unicamente un detalle
router.delete(
  "/detalle/:id",
  checkLogin,
  checkNivel("editor", "admin"),
  async (req, res) => {
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
        error: "Ocurrio un error al eliminar el detalle de la orden",
        detalle: err.message,
      });
    }
  },
);

router.put("/:id", checkLogin, checkNivel('editor', 'admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const modificar = await serviciosOrden.modificarOrden(id, datos);

    res.status(200).json({
      message: "Orden modificada existosamente",
      data: modificar,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al intentar modificar los detalles de la orden",
      detalle: err.message,
    });
  }
});

router.put("/facturar/:id", checkLogin, checkNivel('editor', 'admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const estado = req.body.estado;
    const cambiar = await serviciosOrden.cambiarEstado(id, estado);

    res.status(200).json({
      message: "Se cambió el estado de la orden",
      data: cambiar,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error al cambiar el estado de la orden",
      detalle: err.message,
    });
  }
});

module.exports = router;

// quiero dormir son las 2 de la mañana
