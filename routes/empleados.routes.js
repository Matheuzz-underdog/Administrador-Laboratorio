const express = require("express");
const router = express.Router();
const control = require("../controllers/empleados.controller");

// Mostrar todos los empleados

router.get("/", async (req, res) => {
  try {
    if (req.query.cedula) {
      const queryCedula = req.query.cedula;
      const empleado = await control.buscarPorCedula(queryCedula);

      return res.status(200).json({
        message: "Empleado encontrado",
        data: empleado,
      });
    }
    const datos = await control.verTodos();

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
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Ocurrio un error en el servidor al obtener la lista de empleados",
      detalle: err.message,
    });
  }
});

// Crear un nuevo empleado (esclavo asalariado)

router.post("/", async (req, res) => {
  try {
    const empleadoCreado = await control.crearEmpleado(req.body);

    res.status(201).json({
      message: "Empleado creado exitosamente",
      data: empleadoCreado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error en servidor al crear pacientes",
      detalle: err.message,
    });
  }
});

// Actualizar informacion de empleado (esclavo)

router.put("/:cedula", async (req, res) => {
  try {
    const cedulaAntigua = req.params.cedula;
    console.log(cedulaAntigua);
    const datosNuevos = req.body;

    const empleadoActualizado = await control.actualizarEmpleado(
      cedulaAntigua,
      datosNuevos,
    );

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
      error: "Error en servidor al actualizar empleado",
      detalle: err.message,
    });
  }
});

// Eliminar empleado de la existencia

router.delete("/:cedula", async (req, res) => {
  try {
    const eliminarData = req.params.cedula;
    const empleadoEliminado =
      await control.fulminarEmpleadoDeLaExistencia(eliminarData);

    res.status(200).json({
      message: "Empleado eliminado exitosamente",
      data: empleadoEliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Error en servidor al borrar empleado",
      detalle: err.message,
    });
  }
});

//cambio actividad_empleado
router.put("/actividad/:cedula", async (req, res) => {
  try {
    const cedulaEmpleado = req.params.cedula;
    const datos = req.body.actividad;

    const exito = await control.cambioDeActividad(cedulaEmpleado, datos);

    res.status(200).json({
      message: "Actividad del empleado cambiada exitosamente",
      data: exito,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }
    res.status(500).json({
      error: "Error en servidor al cambiar actividad del empleado",
      detalle: err.message,
    });
  }
});

module.exports = router;
