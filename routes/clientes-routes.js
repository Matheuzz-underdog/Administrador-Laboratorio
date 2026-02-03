const express = require("express");
const router = express.Router();
const control = require("../controllers/clientes-controller");

router.get("/", async (req, res) => {
  try {
    const datos = await control.mostrarTodos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de clientes guardados",
        data: [],
        total: 0,
      });
    }

    res.status(200).json({
      message: `${datos.length} clientes encontrados`,
      total: datos.length,
      data: datos,
    });

    if (process.argv[2] && process.argv[2] === "dev") {
      console.log(datos);
      console.log(
        " - Console Info - ".bgWhite.black,
        "\nSi se quiere añadir un nuevo cliente (post), se debe de enviar un archivo JSON con el siguiente formato:\n",
        '{\n\t"cedula": [cedula-de-identidad],\n\t"nombre": [nombre],\n\t"apellido": [apellido],\n\t"telefono": [nro-de-telefono],\n\t"email": [dirección-email]\n\t"direccion": [dirección-completa]\n}'
          .yellow.italic,
      );
    }
  } catch (err) {
    res.status(500).json({
      error: "Ocurrio un error al obtener la lista de clientes",
      detalle: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const clienteCreado = await control.crearCliente(req.body);

    res.status(201).json({
      message: "Cliente creado exitosamente",
      data: clienteCreado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al crear cliente",
      detalle: err.message,
    });
  }
});

router.post("/buscar", async (req, res) => {
  try {
    const cliente = await control.buscarPorCedula(req.body.cedula);

    res.status(200).json({
      message: "Cliente encontrado",
      data: cliente,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar cliente",
      detalle: err.message,
    });
  }
});

router.get("/ultimos", async (req, res) => {
  try {
    const ultimos = await control.ultimosCinco();

    res.status(200).json({
      message: "Últimos 5 clientes registrados",
      total: ultimos.length,
      data: ultimos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al obtener últimos clientes",
      detalle: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cliente = await control.buscarPorID(req.params.id);

    res.status(200).json({
      message: "Cliente encontrado",
      data: cliente,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al buscar cliente",
      detalle: err.message,
    });
  }
});

router.put("/:cedula", async (req, res) => {
  try {
    const clienteActualizado = await control.actualizarCliente(
      req.params.cedula,
      req.body
    );

    res.status(200).json({
      message: "Cliente actualizado exitosamente",
      data: clienteActualizado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al actualizar cliente",
      detalle: err.message,
    });
  }
});

router.delete("/:cedula", async (req, res) => {
  try {
    const clienteEliminado = await control.eliminarCliente(req.params.cedula);

    res.status(200).json({
      message: "Cliente eliminado exitosamente",
      data: clienteEliminado,
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.error,
        detalle: err.detalle,
      });
    }

    res.status(500).json({
      error: "Error al eliminar cliente",
      detalle: err.message,
    });
  }
});

module.exports = router;