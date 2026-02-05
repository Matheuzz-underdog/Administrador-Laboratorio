const pacientes = require("../models/pacientes-model");
const valid = require("../utils/validator");

// Controller de pacientes (asi queda mas ordenado)

class Controller {
  static async mostrarTodos() {
    const datos = await pacientes.todos();
    return datos;
  }

  static async buscarPorCedula(cedula) {
    if (!cedula) {
      throw {
        status: 400,
        error: "Cédula requerida",
        detalle: 'Envíe la cédula en el body: {"cedula": "V-12345678"}',
      };
    }

    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-12345678 (6-8 dígitos)",
      };
    }

    const paciente = await pacientes.buscarCedula(cedula);

    if (!paciente) {
      throw {
        status: 404,
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      };
    }

    return paciente;
  }

  static async buscarPorID(id) {
    if (!id || id.length !== 5) {
      throw {
        status: 400,
        error: "ID inválido",
        detalle: "El ID debe tener exactamente 5 caracteres",
      };
    }

    const paciente = await pacientes.buscarId(id);

    if (!paciente) {
      throw {
        status: 404,
        error: "Paciente no encontrado",
        detalle: `No existe paciente con ID que empiece por ${id}`,
      };
    }

    return paciente;
  }

  static async ultimosCinco() {
    const ultimos = await pacientes.ultimosCinco();
    return ultimos;
  }

  static async eliminarPaciente(cedula) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-12345678",
      };
    }

    const pacienteExistente = await pacientes.buscarCedula(cedula);
    if (!pacienteExistente) {
      throw {
        status: 404,
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      };
    }

    const pacienteEliminado = await pacientes.delete(cedula);
    return pacienteEliminado;
  }

  static async crearPaciente(data) {
    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos del paciente en formato JSON",
      };
    }

    const obligatorios = ["cedula", "nombre", "apellido", "fechaNacimiento", "sexo", "telefono", "direccion"];
    const faltantes = obligatorios.filter((campo) => !data[campo]);

    if (faltantes.length > 0) {
      throw {
        status: 400,
        error: "Campos obligatorios faltantes",
        detalle: `Faltan: ${faltantes.join(", ")}`,
      };
    }

    if (!valid.cedula(data.cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-XXXXXXXX (6-8 dígitos)",
      };
    }
    
    if (!valid.telefono(data.telefono)) {
      throw {
        status: 400,
        error: "Teléfono inválido",
        detalle: "Formato: XXXX-XXXXXXX",
      };
    }

    const existe = await pacientes.buscarCedula(data.cedula);
    if (existe) {
      throw {
        status: 409,
        error: "Cédula duplicada",
        detalle: `La cédula ${data.cedula} ya está registrada`,
      };
    }

    if (!valid.fecha(data.fechaNacimiento)) {
      throw {
        status: 400,
        error: "Fecha inválida",
        detalle: "Use formato YYYY-MM-DD",
      };
    }

    if (data.email && !valid.email(data.email)) {
      throw {
        status: 400,
        error: "Email invalido",
        detalle: "Use formato valido: usuario@dominio.com",
      };
    }

    const pacienteCreado = await pacientes.crearPaciente(data);
    return pacienteCreado;
  }

  static async actualizarPaciente(cedula, nuevosDatos) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida en URL",
        detalle: "Formato: V-12345678",
      };
    }

    const pacienteExistente = await pacientes.buscarCedula(cedula);
    if (!pacienteExistente) {
      throw {
        status: 404,
        error: "Paciente no encontrado",
        detalle: `No existe paciente con cédula ${cedula}`,
      };
    }
    const sexosValidos = ["M", "F"];

    if (!sexosValidos.includes(nuevosDatos.sexo)) {
      throw {
        status: 400,
        error: "Valor de sexo inválido",
        detalle:  "Use 'M' para Masculino o 'F' para Femenino.",
      };
    }

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

    if (
      nuevosDatos.fechaNacimiento &&
      !valid.fecha(nuevosDatos.fechaNacimiento)
    ) {
      throw {
        status: 400,
        error: "Fecha inválida",
        detalle: "Use formato YYYY-MM-DD",
      };
    }

    if (nuevosDatos.email && !valid.email(nuevosDatos.email)) {
      throw {
        status: 400,
        error: "Email inválido",
        detalle: "Use formato válido",
      };
    }

    const pacienteActualizado = await pacientes.actualizar(cedula, nuevosDatos);

    if (!pacienteActualizado) {
      throw {
        status: 500,
        error: "Error al actualizar",
        detalle: "No se pudo actualizar el paciente",
      };
    }

    return pacienteActualizado;
  }
}

module.exports = Controller;
