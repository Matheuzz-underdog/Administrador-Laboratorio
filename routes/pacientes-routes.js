const express = require("express");
const router = express.Router();
const control = require("../controllers/pacientes-controller");

//mostrara todos
router.get("/", async (req, res) => {
  try {
    const datos = await control.mostrarTodos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de pacientes guardados",
        data: [],
        total: 0,
      });
    }

    res.status(200).json({
      message: `${datos.length} pacientes encontrados`,
      total: datos.length,
      data: datos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de pacientes",
      detalle: err.message,
    });
  }
});

// crear pacientes
router.post("/", async (req, res) => {
  try {
    const pacientesCreado = await control.crearPaciente(req.body);

    res.status(201).json({
      message: "Paciente creado exitosamente",
      data: pacientesCreado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al crear pacientes",
      detalle: err.message,
    });
  }
});

// buscar por cedula
router.post("/buscar", async (req, res) => {
  try {
    const pacientes = await control.buscarPorCedula(req.body.cedula);

    res.status(200).json({
      message: "Paciente encontrado",
      data: pacientes,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar paciente",
      detalle: err.message,
    });
  }
});

// mostrar ultimos 5
router.get("/ultimos", async (req, res) => {
  try {
    const ultimos = await control.ultimosCinco();

    res.status(200).json({
      message: "Últimos 5 pacientes registrados",
      total: ultimos.length,
      data: ultimos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener últimos pacientes",
      detalle: err.message,
    });
  }
});

// buscar por id
router.get("/:id", async (req, res) => {
  try {
    const pacientes = await control.buscarPorID(req.params.id);

    res.status(200).json({
      message: "Paciente encontrado",
      data: pacientes,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar paciente",
      detalle: err.message,
    });
  }
});

// actualizar paciente
router.put("/:cedula", async (req, res) => {
  try {
    const pacientesActualizado = await control.actualizarPaciente(
      req.params.cedula,
      req.body,
    );

    res.status(200).json({
      message: "Paciente actualizado exitosamente",
      data: pacientesActualizado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al actualizar paciente",
      detalle: err.message,
    });
  }
});

// eliminar pacientes
router.delete("/", async (req, res) => {
  try {
    const pacientesEliminado = await control.eliminarPaciente(req.body.cedula);

    res.status(200).json({
      message: "Paciente eliminado exitosamente",
      data: pacientesEliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al eliminar paciente",
      detalle: err.message,
    });
  }
});

module.exports = router;
