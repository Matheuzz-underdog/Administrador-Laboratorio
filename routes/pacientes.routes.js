const express = require("express");
const router = express.Router();
const control = require("../controllers/pacientes.controller");

//mostrara todos
router.get("/", async (req, res) => {
  try {
    if (req.query.cedula) {
      const cedulaLimpia = req.query.cedula;
      const pacientes = await control.buscarPorCedula(cedulaLimpia);

      return res.status(200).json({
        message: "Paciente encontrado",
        data: pacientes,
      });
    }
    const datos = await control.mostrarTodos();
    res.render("pacientes", { pacientes: datos.reverse() });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
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

    if (nuevosDatos.cedula && nuevosDatos.cedula !== cedula) {
      if (!valid.cedula(nuevosDatos.cedula)) {
        throw {
          status: 400,
          error: "Nueva cédula inválida",
          detalle: "Formato: V-12345678",
        };
      }

      const existeNuevaCedula = await pacientes.buscarCedula(
        nuevosDatos.cedula,
      );
      if (existeNuevaCedula) {
        throw {
          status: 409,
          error: "Cédula duplicada",
          detalle: `La cédula ${nuevosDatos.cedula} ya está registrada`,
        };
      }
    }
  }
});

// buscar por cedula
router.post("/buscar", async (req, res) => {
  try {
    const paciente = await control.buscarPorCedula(req.body.cedula);
    res.status(200).json({ message: "Paciente encontrado", data: paciente });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.error, detalle: err.detalle });
    res.status(500).json({ error: "Error al buscar paciente", detalle: err.message });
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
router.delete("/:cedula", async (req, res) => {
  try {
    const pacientesEliminado = await control.eliminarPaciente(req.params.cedula);

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
