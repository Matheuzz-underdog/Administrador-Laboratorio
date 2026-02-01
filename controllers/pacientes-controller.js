const pacientes = require("../models/pacientes-model");

// Mostrar todos pacientes registrados (si hay)
const mostrarTodos = async (req, res) => {
  try {
    const datos = await pacientes.todos();

    if (datos.length === 0) {
      return res.status(200).json({
        message: "Actualmente no hay datos de pacientes guardados",
        data: [],
      });
    }

    res.status(200).json({
      "cantidad de pacientes": datos.length,
      datos: datos,
    });

    // Envia una lista de los pacientes guardados en la DB (esto es mejor optimizarlo en la fase 2)
    if (process.argv[2] && process.argv[2] === "dev") {
      console.log(datos);
      console.log(
        " - Console Info - ".bgWhite.black,
        "\nSi se quiere añadir un nuevo paciente (post), se debe de enviar un archivo JSON con el siguiente formato:\n",
        '{\n\t"cedula": [cedula-de-identidad],\n\t"nombre": [nombre],\n\t"apellido": [apellido],\n\t"telefono": [nro-de-telefono],\n\t"email": [dirección-email]\n\t"direccion": [dirección-completa]\n}'
          .yellow.italic,
      );
    }
  } catch (err) {
    res.status(500).json({
      err: "Ocurrio un error al obtener la lista de pacientes",
    });
  }
};

// Buscar por cédula de identidad [ARREGLAR]
const buscarPorCedula = async (req, res) => {
  try {
    const data = req.query;
    const cedulaLimpia = data.cedula.trim();
    const cedulaformato = /^V-\d{6,8}$/;

    if (!data || typeof data !== "string") {
      resolve(null);
      return;
    }

    const dataFinal = await pacientes.buscarCedula(data);

    res.status(200).json({
      message: "Datos encontrados...",
      data: dataFinal,
    });
  } catch (err) {
    res.status(500).json({
      err: "Error al intentar buscar el paciente",
    });
  }
};

// Agregar nuevo paciente a la bd
const agregarPaciente = async (req, res) => {
  try {
    const data = req.body;

    // Manejar errores...
    if (data === "" || data === undefined) {
      (res.status(400).json({
        message: "Ingrese los datos correctamente",
        data: req.body,
      }),
        console.log("Algo pasó."));
    }
    if (!data.cedula) {
      return (
        res.status(400).json({
          message: "La cédula es requerida",
          data: req.body,
        }),
        console.log("Algo pasó.")
      );
    }
    const cedulaLimpia = data.cedula;
    const cedulaformato = /^V-\d{6,8}$/;

    if (!cedulaformato.test(cedulaLimpia)) {
      return (
        res.status(400).json({
          message: "La cédula debe tener de 6 a 8 dígitos",
          data: req.body,
        }),
        console.log("Algo pasó.")
      );
    }

    const camposRequeridos = ["nombre", "apellido", "fechaNacimiento"];

    const faltantes = camposRequeridos.filter((campo) => !data[campo]);

    if (faltantes.length > 0) {
      return (
        res.status(400).json({
          message: `Faltan campos requeridos: ${faltantes.join(", ")}`,
          data: req.body,
        }),
        console.log("Algo pasó.")
      );
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (data.fechaNacimiento && !fechaRegex.test(data.fechaNacimiento)) {
      return res.status(400).json({
        message: "La fecha de nacimiento debe estar en formato YYYY-MM-DD",
        data: req.body,
      });
    }
    console.log(data);

    // Transforma data
    const dataFinal = await pacientes.crearPaciente(data);

    res.status(201).json({
      message: "Los nuevos datos fueron ingresados correctamente",
      data: dataFinal,
    });
  } catch (err) {
    res.status(500).json({
      err: "Error al intentar ingresar los datos",
    });
  }
};

// Borrar paciente de la bd [en proceso]
const borrarPaciente = async (req, res) => {
  try {
  } catch (err) {}
};

// Buscar los ultimos 5 pacientes
const buscarUltimosCinco = async (req, res) => {};

const buscarPorID = async (req, res) => {
  try {
    const id = req.params.id;

    const paciente = await pacientes.buscarId(id);

    if (!paciente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
        detalle: `No existe ningún registro que coincida con el prefijo ${id}`,
      });
    }

    res.status(200).json({
      mensaje: "Paciente localizado",
      datos: paciente,
    });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  mostrarTodos,
  agregarPaciente,
  buscarPorCedula,
  buscarPorID,
};
