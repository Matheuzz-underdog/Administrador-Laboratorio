const express = require("express");
const router = express.Router();
const control = require("../controllers/empleados.controller");

function manejarError(res, err, mensajePorDefecto) {
  if (err.status) {
    return res.status(err.status).json({
      error: err.error || mensajePorDefecto,
      detalle: err.detalle || err.message,
    });
  }
  res.status(500).json({
    error: mensajePorDefecto,
    detalle: err.message || "Error desconocido",
  });
}

// Mostrar todos los empleados

router.get("/", async (req, res) => {
  try {
    const datos = await control.mostrarTodos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de empleados guardados",
        data: [],
        total: 0,
      });
    }

    res.status(200).json({
      message: `${datos.length} empleados encontrados`,
      total: datos.length,
      data: datos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de empleados",
      detalle: err.message,
    });
  }
});

// buscar por cedula

router.get("/ced/:cedula", async (req, res) => {
  try {
    const empleado = await control.buscarCed(req.params.cedula);

    res.status(200).json({
      message: "Empleado encontrado",
      data: empleado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar empleados",
      detalle: err.message,
    });
  }
});

// Buscar por numero

router.get("/num/:numero", async (req, res) => {
  try {
    const empleado = await control.buscarNum(req.params.numero);

    res.status(200).json({
      message: "Empleado encontrado",
      data: empleado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar empleado",
      detalle: err.message,
    });
  }
});

// Crear un nuevo empleado

router.post("/", async (req, res) => {
  try {
    const empleadoCreado = await control.crear(req.body);

    res.status(201).json({
      message: "Empleado creado exitosamente",
      data: empleadoCreado,
    });
  } catch (err) {
    manejarError(res, err, "Error al crear empleado")
  }
});

// Actualizar informacion de empleado

router.put("/", async (req, res) => {
  try {
    const empleadoActualizado = await control.actualizar(req.body);

    res.status(200).json({
      message: "Empleado actualizado exitosamente",
      data: empleadoActualizado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al actualizar empleado",
      detalle: err.message,
    });
  }
});

// Eliminar empleado

router.delete("/", async (req, res) => {
  try {
    const empleadoEliminado = await control.borrar(req.body.cedula);

    res.status(200).json({
      message: "Empleado eliminado exitosamente",
      data: empleadoEliminado,
    });
  } catch (err) {
    manejarError(res, err, "Error al eliminar empleado")
  }
});

module.exports = router;
