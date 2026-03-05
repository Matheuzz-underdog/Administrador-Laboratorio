const Empleados = require("../models/empleados.model.js");
const valid = require("../utils/validator.js");

//tengo sueño

class Controller {
  //HAce lo que dice el nombre
  static async verTodos() {
    const todos = await Empleados.todos();
    return todos;
  }

  static async buscarPorCedula(id) {
    // cedula
    if (!id) {
      throw {
        status: 400,
        error: "Cedula requerida",
        detalle: "Envíe una cédula ",
      };
    }

    if (!valid.cedula(id)) {
      throw {
        status: 400,
        error: "Formato de cédula inválida",
        detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
      };
    }

    const empleado = await Empleados.buscarCedula(id);
    if (empleado.length === 0) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe el empleado con la cédula: ${id}`,
      };
    }

    return empleado;
  }

  // NUEVO ESCLAVO ASALARIADO?
  static async crearEmpleado(datos) {
    if (!datos || Object.keys(datos).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos del empleado en formato JSON",
      };
    }
    const obligatorios = [
      "cedula",
      "nombre",
      "apellido",
      "telefono",
      "email",
      "cargo",
    ];
    const faltantes = obligatorios.filter((campo) => !datos[campo]);

    if (faltantes.length > 0) {
      throw {
        status: 400,
        error: "Campos obligatorios faltantes",
        detalle: `Faltan: ${faltantes.join(", ")}`,
      };
    }

    if (!valid.cedula(datos.cedula)) {
      throw {
        status: 400,
        error: "Cédula inválida",
        detalle: "Formato: V-XXXXXXXX (6-8 dígitos)",
      };
    }

    if (!valid.telefono(datos.telefono)) {
      throw {
        status: 400,
        error: "Teléfono inválido",
        detalle: "Formato: XXXX-XXXXXXX",
      };
    }

    const existe = await Empleados.buscarCedula(datos.cedula);
    if (Object.keys(existe).length !== 0) {
      throw {
        status: 409,
        error: "Cédula duplicada",
        detalle: `La cédula ${datos.cedula} ya está registrada`,
      };
    }
    if (datos.email && !valid.email(datos.email)) {
      throw {
        status: 400,
        error: "Email invalido",
        detalle: "Use formato valido: usuario@dominio.com",
      };
    }
    const empleadoCreado = await Empleados.crear(datos);
    return empleadoCreado;
  }

  // ACTUALIZARRRRR
  static async actualizarEmpleado(cedula, nuevosDatos) {
    if (!nuevosDatos || Object.keys(nuevosDatos).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos nuevos del empleado en formato JSON",
      };
    }

    console.log(cedula);
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "La cedula antigua es inválida",
        detalle: "Formato: V-12345678",
      };
    }

    const existe = await Empleados.buscarCedula(cedula);
    if (!existe) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe Empleado con cédula ${cedula}`,
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
    }
    if (nuevosDatos.email && !valid.email(nuevosDatos.email)) {
      throw {
        status: 400,
        error: "Email inválido",
        detalle: "Use formato válido",
      };
    }

    const empleadoActualizado = await Empleados.actualizar(cedula, nuevosDatos);

    if (!empleadoActualizado) {
      throw {
        status: 400,
        error: "Sin campos para actualizar",
        detalle: "Envíe al menos un campo válido para actualizar",
      };
    }

    return empleadoActualizado;
  }

  // BORRAR BORRAR BORRAR BORRAR BORRAR BORRAR BORRAR BORRAR
  // ESTO ES UN BORRADO FISICO, MALO MALO MALO (PERO A VECES NECESARIO)
  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  static async fulminarEmpleadoDeLaExistencia(cedula) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "La cedula es inválida",
        detalle: "Formato: V-12345678",
      };
    }

    const existe = await Empleados.buscarCedula(cedula);
    if (!existe) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe Empleado con cédula ${cedula}`,
      };
    }

    const empleadoEliminado = await Empleados.borradoFisico(cedula);
    return empleadoEliminado; //eliminado de la existencia
  }

  // borrado logico (cambio de actividad_empleado)
  // cuando despidan a alguien pues
  // lol
  static async cambioDeActividad(cedula, actividad) {
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "La cedula es inválida",
        detalle: "Formato: V-12345678",
      };
    }

    if (actividad !== 0 && actividad !== 1) {
      throw {
        status: 400,
        error: "La actividad debe ser un valor booleano",
        detalle: "Debe ser 1 o 0",
      };
    }

    const existe = await Empleados.buscarCedula(cedula);
    if (!existe) {
      throw {
        status: 404,
        error: "Empleado no encontrado",
        detalle: `No existe Empleado con cédula ${cedula}`,
      };
    }

    const empleado = await Empleados.borradoLogico(cedula, actividad);
    return empleado
  }
}

module.exports = Controller;
