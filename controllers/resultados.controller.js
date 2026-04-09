const Model = require("../models/resultados.model");
const ordenesDetalles = require("../models/ordenes.model");
const empleados = require("../models/empleados.model");
const examenes = require("../models/examenes.model");
const valid = require("../utils/validator");

class Controller {
  // Mostrar todos
  static async todosResultados() {
    const todos = await Model.todos();
    return todos;
  }

  // fulminar
  static async borrarResultado(id) {
    if (!id) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }
    const esIDValido = await this.validadorID(id);
    const existe = await Model.buscarPorResultado(id);
    if (!existe || Object.keys(existe).length === 0) {
      throw {
        status: 404,
        error: `No existe un resultado con el ID #${id}`,
        detalle: "Compruebe si el ID ingresado es correcto",
      };
    }

    const borrar = await Model.borrar(id);
    return borrar;
  }
  // crear nuevo resultado
  // me arrepiento de hacer los parametros de los examenes en un json
  // :c
  static async crearResultado(datos) {
    const datosValidos = await this.validadorDeDatos(datos);

    const existeEmpleado = await empleados.buscarCedula(datos.cedula_empleado);
    if (!existeEmpleado || existeEmpleado.length === 0) {
      throw {
        status: 400,
        error: "No existe un empleado con esa cedula",
        detalle: `No hay ningun empleado registrado con la cedula ${datos.cedula_empleado}`,
      };
    }
    const obligatorios = [
      "id_detalle",
      "cedula_empleado",
      "valores_resultados",
      "observaciones",
    ];
    const faltantes = obligatorios.filter((campo) => !datos[campo]);
    if (faltantes.length > 0) {
      throw {
        status: 400,
        error: "Campos obligatorios faltantes",
        detalle: `Faltan: ${faltantes.join(", ")}`,
      };
    }

    const existeResultadoDetalle = await Model.buscarPorDetalle(
      datos.id_detalle,
    );
    if (existeResultadoDetalle.length > 0) {
      throw {
        status: 400,
        error: "Ya existe un resultado",
        detalle: `Ya existe un resultado asignado al detalle ID #${datos.id_detalle}`,
      };
    }

    const parametros = await ordenesDetalles.buscarDetalle(datos.id_detalle);
    if (!parametros || Object.keys(parametros).length === 0) {
      throw {
        status: 400,
        error: "No existe el detalle especificado",
        detalle: `No existe un detalle con el ID #${datos.id_detalle}`,
      };
    }
    const examen = await examenes.buscarExamen(
      parametros[0].abreviatura_examen,
    );
    const valoresResultados = examen[0].parametros;

    const parse = JSON.parse(valoresResultados);

    const longitudValores = Object.keys(datos.valores_resultados).length;

    let formateoValores = [];
    for (let i = 0; i < longitudValores; i++) {
      let nose = datos.valores_resultados[i];
      let resultado = parse.find((exam) => exam.nombre === nose.nombre);
      const v = {};
      if (!resultado) {
        throw {
          status: 400,
          error: `Un parametro no existe`,
          detalle: `No existe un parametro llamado ${nose.nombre} para examen asignado al detalle de orden con ID #${datos.id_detalle}`,
        };
      }
      if (resultado.unidad === "Texto") {
        v.nombre = nose.nombre;
        v.valor = nose.valor;
        v.referencia = resultado.referencia;
      } else {
        v.nombre = nose.nombre;
        v.valor = nose.valor + resultado.unidad;
        v.referencia = resultado.referencia;
      }
      formateoValores.push(v);
    }

    datos.valores_resultados = JSON.stringify(formateoValores);
    const creado = await Model.crear(datos);
    return creado;
  }

  static async buscarResultado(id) {
    const esIDValido = await this.validadorID(id);
    const buscar = await Model.buscarPorDetalle(id);
    return buscar;
  }

  // FALTA PODER MODIFICAR RESULTADOS, PENDIENTE
  // WIP

  // validadores
  // validan
  static async validadorDeDatos(datos) {
    if (!datos || Object.keys(datos).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Los datos son muy importantes. ¿Por qué no envías nada?",
      };
    }

    if (!datos.valores_resultados || datos.valores_resultados.length === 0) {
      throw {
        status: 400,
        error: "Los valores del resultado son obligatorios",
        detalle: `Envie los valores_resultados, son necesarios para crear el elemento`,
      };
    }
    if (!valid.cedula(datos.cedula_empleado)) {
      throw {
        status: 400,
        error: "Formato de cedula invalido",
        detalle: "El formato correcto debe verse como: V-XXXXXXXX",
      };
    }
  }

  static async validadorID(id) {
    const transform = Number(id);
    if (!transform) {
      throw {
        status: 400,
        error: `Envíe un valor numérico`,
        detalle: "Los resultados tienen IDs numéricos",
      };
    }
  }
}

module.exports = Controller;
