const pacientes = require("../models/pacientes-model");

const validarCedula = (cedula) => {
  const formato = /^V-\d{6,8}$/;
  return formato.test(cedula);
};

const validarFecha = (fecha) => {
  const formato = /^\d{4}-\d{2}-\d{2}$/;
  if (!formato.test(fecha)) return false;

  const fechaObj = new Date(fecha);
  return fechaObj instanceof Date && !isNaN(fechaObj);
};

const validarEmail = (email) => {
  if (!email) return true; // Email es opcional
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formato.test(email);
};

// Mostrar todos pacientes registrados (si hay)
const mostrarTodos = async (req, res) => {
  try {
    const datos = await pacientes.todos();

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

    // (esto es mejor optimizarlo en la fase 2)
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
      detalle: err.message,
    });
  }
};

//buscar por cedula PA
const buscarPorCedula = async (req, res) => {
  try {
    const { cedula } = req.body;

    // Validar que se envió cédula
    if (!cedula) {
      return res.status(400).json({
        error: "Cédula requerida",
        detalle: 'Envíe la cédula en el body: {"cedula": "V-12345678"}',
      });
    }

    // Validar formato
    if (!validarCedula(cedula)) {
      return res.status(400).json({
        error: "Cédula inválida",
        detalle: "Formato: V-12345678 (6-8 dígitos)",
      });
    }

    const paciente = await pacientes.buscarCedula(cedula);

    if (!paciente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      });
    }

    res.status(200).json({
      message: "Paciente encontrado",
      data: paciente,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al buscar paciente",
      detalle: err.message,
    });
  }
};

// Agregar nuevo paciente a la bd
const crearPaciente = async (req, res) => {
  try {
    const data = req.body;

    // Validar que hay datos
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        error: "Datos requeridos",
        detalle: "Envíe los datos del paciente en formato JSON",
      });
    }

    // Validar campos
    const obligatorios = ["cedula", "nombre", "apellido", "fechaNacimiento"];
    const faltantes = obligatorios.filter((campo) => !data[campo]);

    if (faltantes.length > 0) {
      return res.status(400).json({
        error: "Campos obligatorios faltantes",
        detalle: `Faltan: ${faltantes.join(", ")}`,
      });
    }

    // Validar formato
    if (!validarCedula(data.cedula)) {
      return res.status(400).json({
        error: "Cédula inválida",
        detalle: "Formato: V-12345678 (6-8 dígitos)",
      });
    }

    // Verificar existencia
    const existe = await pacientes.buscarCedula(data.cedula);
    if (existe) {
      return res.status(409).json({
        error: "Cédula duplicada",
        detalle: `La cédula ${data.cedula} ya está registrada`,
      });
    }

    // Validar fecha
    if (!validarFecha(data.fechaNacimiento)) {
      return res.status(400).json({
        error: "Fecha inválida",
        detalle: "Use formato YYYY-MM-DD",
      });
    }

    // Validar email aunque no obligatorio
    if (data.email && !validarEmail(data.email)) {
      return res.status(400).json({
        error: "Email invalido",
        detalle: "Use formato valido: usuario@dominio.com",
      });
    }

    const pacienteCreado = await pacientes.crearPaciente(data);

    res.status(201).json({
      message: "Paciente creado exitosamente",
      data: pacienteCreado,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al crear paciente",
      detalle: err.message,
    });
  }
};

// Borrar paciente de la bd
const eliminarPaciente = async (req, res) => {
  try {
    const { cedula } = req.params;

    // Validar formato
    if (!validarCedula(cedula)) {
      return res.status(400).json({
        error: "Cédula inválida",
        detalle: "Formato: V-12345678",
      });
    }

    // Verificar
    const pacienteExistente = await pacientes.buscarCedula(cedula);
    if (!pacienteExistente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      });
    }

    const pacienteEliminado = await pacientes.delete(cedula);

    res.status(200).json({
      message: "Paciente eliminado exitosamente",
      data: pacienteEliminado,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al eliminar paciente",
      detalle: err.message,
    });
  }
};

// Buscar los ultimos 5 pacientes
const ultimosCinco = async (req, res) => {
  try {
    const ultimos = await pacientes.ultimosCinco();

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
};

//buscar por id
const buscarPorID = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar longitud del ID
    if (!id || id.length !== 5) {
      return res.status(400).json({
        error: "ID inválido",
        detalle: "El ID debe tener exactamente 5 caracteres",
      });
    }

    const paciente = await pacientes.buscarId(id);

    if (!paciente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
        detalle: `No existe paciente con ID que empiece por ${id}`,
      });
    }

    res.status(200).json({
      message: "Paciente encontrado",
      data: paciente,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al buscar paciente",
      detalle: err.message,
    });
  }
};

//actualizar paciente
const actualizarPaciente = async (req, res) => {
  try {
    const { cedula } = req.params;
    const nuevosDatos = req.body;

    // Validar formato de cédula en URL
    if (!validarCedula(cedula)) {
      return res.status(400).json({
        error: "Cédula inválida en URL",
        detalle: "Formato: V-12345678",
      });
    }

    const pacienteExistente = await pacientes.buscarCedula(cedula);
    if (!pacienteExistente) {
      return res.status(404).json({
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      });
    }

    // Si se quiere cambiar la cédula, validar
    if (nuevosDatos.cedula && nuevosDatos.cedula !== cedula) {
      if (!validarCedula(nuevosDatos.cedula)) {
        return res.status(400).json({
          error: "Nueva cédula inválida",
          detalle: "Formato: V-12345678",
        });
      }

      // Verificar si nueva cédula ya existe
      const existeNuevaCedula = await pacientes.buscarCedula(
        nuevosDatos.cedula,
      );
      if (existeNuevaCedula) {
        return res.status(409).json({
          error: "Cédula duplicada",
          detalle: `La cédula ${nuevosDatos.cedula} ya está registrada`,
        });
      }
    }

    if (
      nuevosDatos.fechaNacimiento &&
      !validarFecha(nuevosDatos.fechaNacimiento)
    ) {
      return res.status(400).json({
        error: "Fecha inválida",
        detalle: "Use formato YYYY-MM-DD",
      });
    }

    if (nuevosDatos.email && !validarEmail(nuevosDatos.email)) {
      return res.status(400).json({
        error: "Email inválido",
        detalle: "Use formato válido",
      });
    }

    const pacienteActualizado = await pacientes.actualizar(cedula, nuevosDatos);

    if (!pacienteActualizado) {
      return res.status(500).json({
        error: "Error al actualizar",
        detalle: "No se pudo actualizar el paciente",
      });
    }

    res.status(200).json({
      message: "Paciente actualizado exitosamente",
      data: pacienteActualizado,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al actualizar paciente",
      detalle: err.message,
    });
  }
};

module.exports = {
  mostrarTodos,
  crearPaciente,
  buscarPorCedula,
  buscarPorID,
  actualizarPaciente,
  eliminarPaciente,
  ultimosCinco,
};
