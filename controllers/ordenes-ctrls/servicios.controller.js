// modelos
const ordenesModel = require("../../models/ordenes.model");
const empleadosModel = require("../../models/empleados.model");
const pacientesModel = require("../../models/pacientes.model");

// etc
const detallesControl = require("./detalles.controller");
const valid = require("../../utils/validator");

class Controller {
  static async todasOrdenes() {
    const ordenes = await ordenesModel.todos();
    return ordenes;
  }

  // AAAAAAAAAAAAAAAAAAAAAAAAAAa
  static async buscarOrden(cedula) {
    if (!cedula) {
      throw {
        status: 400,
        error: "Cedula requerida",
        detalle: "Envíe una cédula válida",
      };
    }
    if (!valid.cedula(cedula)) {
      throw {
        status: 400,
        error: "Formato de cédula inválida",
        detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
      };
    }
    const ordenDeseada = await ordenesModel.buscar(cedula);
    if (!ordenDeseada) {
      throw {
        status: 404,
        error: "Orden no encontrada",
        detalle: `No se encontró una orden guardada con la cédula ${cedula}`,
      };
    }
    return ordenDeseada;
  }

  //damn
  // -_-
  static async crearOrden(datos) {
    if (!datos || Object.keys(datos).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }

    if (
      !valid.cedula(datos.cedula_paciente) ||
      !valid.cedula(datos.cedula_empleado)
    ) {
      throw {
        status: 400,
        error: "Formato de cedulas inválidas",
        detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
      };
    }

    const existePaciente = await pacientesModel.buscarCedula(
      datos.cedula_paciente,
    );
    const existeEmpleado = await empleadosModel.buscarCedula(
      datos.cedula_empleado,
    );

    if (!existePaciente) {
      throw {
        status: 404,
        error: `No existe un paciente con la cedula ${datos.cedula_paciente}`,
        detalle:
          "Debe ingresar la información del paciente en la pestaña de registro de Nuevos Pacientes",
      };
    }
    if (!existeEmpleado) {
      throw {
        status: 404,
        error: `No existe un empleado con la cedula ${datos.cedula_empleado}`,
        detalle: "Compruebe que la cedula ingresada es correcta",
      };
    }
    const orden_detalles = await detallesControl.formatear(datos.detalles_orden);
    if (!orden_detalles) {
      throw {
        status: 404,
        error: `Algun Examen ingresado no existe`,
        detalle: "Alguno de los examenes ingresados en la orden no existe",
      };
    }
    const datosFinales = {
      ordenes_servicio: {
        cedula_paciente: datos.cedula_paciente,
        cedula_empleado: datos.cedula_empleado,
      },
      orden_detalles,
    };
    console.log("SOY DATOS FINALES", datosFinales);
    const crear = await ordenesModel.crear(datosFinales);

    return crear;
  }

  static async eliminarOrden(id) {
    if (!id) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }
    const transform = Number(id);
    if (!transform) {
      throw {
        status: 400,
        error: `Envíe un valor numérico`,
        detalle: "Las ordenes tienen IDs numéricos",
      };
    }

    const existe = await ordenesModel.buscarId(transform);
    if (!existe || Object.keys(existe).length === 0) {
      throw {
        status: 404,
        error: `No existe una orden con el ID #${id}`,
        detalle: "Compruebe si el ID ingresado es correcto",
      };
    }

    const eliminado = await ordenesModel.eliminar(id);
    return eliminado;
  }
}
/*
  ¿Como se veria una orden (enviada por el front)?
  algo asi:
  {
    "cedula_paciente": "V-13111222",
    "cedula_empleado": "V-25666777",
    "detalles_orden": {
      "1": {
        "abreviatura_examen": "HEM"
      },
      "2": {
        "abreviatura_examen": "GLU"
      },
      "3": {
        "abreviatura_examen": "VDRL"
      }
    }
  }
*/

module.exports = Controller;
