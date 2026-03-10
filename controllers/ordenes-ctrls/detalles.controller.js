const examenesModel = require("../../models/examenes.model");
const ordenesModel = require("../../models/ordenes.model");
const valid = require("../../utils/validator");

class Controller {
  static async eliminarDetalle(id) {
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
        detalle: "Las detalles tienen IDs numéricos",
      };
    }

    const existe = await ordenesModel.buscarDetalle(transform);
    if (!existe || Object.keys(existe).length === 0) {
      throw {
        status: 404,
        error: `No existe un detalle de orden con el ID #${id}`,
        detalle: "Compruebe si el ID ingresado es correcto",
      };
    }

    const eliminado = await ordenesModel.eliminarDetalle(id);
    return eliminado;
  }

  // idk
  static async formatear(datos) {
    const nuevaData = {};

    for (let i = 0; i < datos.length; i++) {
      const abreviatura = datos[i];

      if (!valid.longitud(abreviatura)) {
        throw {
          status: 400,
          error: "La abreviatura debe poseer de 3 a 4 letras (mayúsculas)",
          detalle: "Debería verse algo como: GLU (glucosa)",
        };
      }
      const examenData = await examenesModel.buscarExamen(abreviatura);
      if (!examenData) {
        return null;
      }
      nuevaData[`detalle${i + 1}`] = {
        abreviatura_examen: abreviatura,
        monto_historico: examenData[0].precio_examen,
      };
    }
    console.log(nuevaData);
    return nuevaData;
  }
}

module.exports = Controller;
