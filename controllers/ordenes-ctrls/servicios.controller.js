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
  static async contarOrdenes() {
    const cuenta = await ordenesModel.contar();
    return cuenta[0];
  }
  static async cuantasHoy() {
    const hoy = await ordenesModel.hoy();
    return hoy[0];
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

    await this.comprobarExistenciaPorCedula(
      datos.cedula_paciente,
      datos.cedula_empleado,
    );
    const orden_detalles = await detallesControl.formatear(
      datos.detalles_orden,
    );
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

  static async modificarOrden(id, datos) {
    if (!datos) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }

    const filtro = ["cedula_paciente", "cedula_empleado"];
    const esValido = Object.keys(datos).every((key) => filtro.includes(key));

    if (!esValido) {
      throw {
        status: 400,
        error: "Datos inválidos",
        detalle: "Datos invalidos. Parametros no permitidos",
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
    const cedulaAsignada = await ordenesModel.buscarId(id);
    const cedulaExiste = cedulaAsignada[0].cedula_paciente;

    if (cedulaExiste === datos.cedula_paciente) {
      throw {
        status: 400,
        error: `Cédula ya registrada`,
        detalle: `Una de las cedulas enviadas ya está registrada`,
      };
    }

    await this.comprobarExistenciaPorCedula(
      datos.cedula_paciente,
      datos.cedula_empleado,
    );

    const nuevosDatos = await ordenesModel.actualizar(id, datos);
    return nuevosDatos;
  }

  // etc
  static async comprobarExistenciaPorCedula(cedulaPaciente, cedulaEmpleado) {
    if (cedulaPaciente) {
      console.log("HELLO");
      const existePaciente = await pacientesModel.buscarCedula(cedulaPaciente);
      if (!existePaciente || Object.keys(existePaciente).length === 0) {
        throw {
          status: 404,
          error: `No existe un paciente con la cedula ${cedulaPaciente}`,
          detalle:
            "Debe ingresar la información del paciente en la pestaña de registro de Nuevos Pacientes",
        };
      }
    }
    if (cedulaEmpleado) {
      const existeEmpleado = await empleadosModel.buscarCedula(cedulaEmpleado);
      if (!existeEmpleado || Object.keys(existeEmpleado).length === 0) {
        throw {
          status: 404,
          error: `No existe un empleado con la cedula ${cedulaEmpleado}`,
          detalle: "Compruebe que la cedula ingresada es correcta",
        };
      }
    }
    return true;
  }

  static async cambiarEstado(id, estado) {
    if (!estado || !id) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }

    const posible = ["Pendiente", "Pagado"];
    const esValido = posible.includes(estado);

    if (!esValido) {
      throw {
        status: 400,
        error: "El valor ingresado es inválido",
        detalle: "Solo hay dos posibles estados (Pendiente/Pagado)",
      };
    }

    const comprobarEstado = await ordenesModel.buscarId(id);
    if (comprobarEstado[0].estado_pago === estado) {
      throw {
        status: 400,
        error: "La orden a se encuentra en ese estado",
        detalle: `Esa orden ya se encuentra en el estado ${estado}`,
      };
    }

    const cambiar = await ordenesModel.cambiar(id, estado);
    return cambiar;
  }

  static async buscarPorID(id) {
    const orden = await ordenesModel.buscarTodoDetalles(id);
    return orden;
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
