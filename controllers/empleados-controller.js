const empleados = require("../models/empleados-model");
const valid = require("../utils/validator");

// Controller de empleados

class Controller {
  static async mostrarTodos() {
    const datos = await empleados.verTodos();
    return datos;
  }

  static async buscarPorCedula(cedula) {
    if (!cedula) {
      throw {
        status: 400,
        error: "Cédula requerida",
        detalle:
          'Envíe la cédula en el body con el siguiente formato: { "cedula": "V-12345678" }',
      };
    }

    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-12345678 (6-8 dígitos)",
      };
    }

    const empleado = await empleados.buscarEmpleado(cedula);

    if (!empleado) {
      throw {
        status: 404,
        error: "empleado no encontrado",
        detalle: `No existe empleado con cédula ${cedula}`,
      };
    }

    return empleado;
  }

  static async buscarPorID(id) {
    if (!id || id.length !== 5) {
      throw {
        status: 400,
        error: "ID inválido",
        detalle: "El ID debe tener exactamente 5 caracteres",
      };
    }

    const empleado = await empleados.buscarEmpleadoID(id);

    if (!empleado) {
      throw {
        status: 404,
        error: "empleado no encontrado",
        detalle: `No existe empleado con ID que empiece por ${id}`,
      };
    }

    return empleado;
  }

  static async eliminarEmpleado(cedula) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-12345678",
      };
    }

    const empleadoExistente = await empleados.buscarEmpleado(cedula);
    if (!empleadoExistente) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe empleado con cédula ${cedula}`,
      };
    }

    const empleadoEliminado = await empleados.delete(cedula);
    return empleadoEliminado;
  }

  static async crearEmpleado(data) {
    if (!data || Object.keys(data).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos del empleado en formato JSON",
      };
    }

    const obligatorios = ["cedula", "nombre", "apellido"];
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
        detalle: "La cédula debe seguir el formato V-12345678 (6-8 dígitos)",
      };
    }

    const existeCedula = await empleados.buscarEmpleado(data.cedula);
    if (existeCedula) {
      throw {
        status: 409,
        error: "Cédula duplicada",
        detalle: `La cédula ${data.cedula} ya está registrada`,
      };
    }

    if (data.email && !valid.email(data.email)) {
      throw {
        status: 400,
        error: "Email invalido",
        detalle: "Use formato valido: usuario@dominio.com",
      };
    }

    const empleadoCreado = await empleados.crearEmpleado(data);
    return empleadoCreado;
  }

  static async actualizarEmpleado(cedula, nuevosDatos) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida en URL",
        detalle: "La cédula debe seguir el formato V-12345678 (6-8 dígitos)",
      };
    }

    const empleadoExistente = await empleados.buscarEmpleado(cedula);
    if (!empleadoExistente) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe empleado con cédula ${cedula}`,
      };
    }

    if (nuevosDatos.cedula && nuevosDatos.cedula !== cedula) {
      if (!valid.cedula(nuevosDatos.cedula)) {
        throw {
          status: 400,
          error: "Nueva cédula inválida",
          detalle: "La cédula debe seguir el formato V-12345678 (6-8 dígitos)",
        };
      }

      const existeCedula = await empleados.buscarEmpleado(nuevosDatos.cedula);
      if (existeCedula) {
        throw {
          status: 409,
          error: "Cédula duplicada",
          detalle: `La cédula ${nuevosDatos.cedula} ya está registrada`,
        };
      }
    }

    if (nuevosDatos.email && !valid.email(nuevosDatos.email)) {
      throw {
        status: 400,
        error: "Email inválido",
        detalle: "Use formato valido: usuario@dominio.com",
      };
    }

    const empleadoActualizado = await empleados.actualizar(cedula, nuevosDatos);

    if (!empleadoActualizado) {
      throw {
        status: 500,
        error: "Error al actualizar",
        detalle: "No se pudo actualizar el empleado",
      };
    }

    return empleadoActualizado;
  }
}

module.exports = Controller;
