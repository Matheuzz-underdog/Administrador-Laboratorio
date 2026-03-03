const examenes = require("../models/examenes.model");
const valid = require("../utils/validator")

class Controller {
  static async mostrarTodos() {
    const listaExamenes = await examenes.listaTotal();
    return listaExamenes;
  }

  // busca examen por abrev
  static async buscarExamenDeseado(abbrevEnv) {
    if (!abbrevEnv || !valid.longitud(abbrevEnv)) {
      throw {
        status: 400,
        error: "Abreviatura requerida",
        detalle: "Debería verse algo como: GLU (glucosa)",
      };
    }

    const examen = await examenes.buscarExamen(abbrevEnv);
    if (!examen) {
      throw {
        status: 404,
        error: "Examen no encontrado",
        detalle: `No se encontró un examen con la abreviatura ${abbrevEnv}`,
      };
    }

    return examen;
  }

  // Crea/Evalua parametros de nuevo examen
  static async crearExamen(dataEnv) {
    if (!valid.longitud(dataEnv.abreviatura)) {
      throw {
        status: 400,
        error: "La abreviatura debe poseer de 3 a 4 letras (mayúsculas)",
        detalle: "Debería verse algo como: GLU (glucosa)",
      };
    }

    if (!dataEnv || Object.keys(dataEnv).length === 0) {
      throw {
        status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos del examen en formato JSON",
      };
    }
    const obligatorios = [
      "nombre",
      "abreviatura",
      "area",
      "precio",
      "tipoMuestra",
      "parametros",
    ];
    const faltantes = obligatorios.filter((campo) => !dataEnv[campo]);

    if (faltantes.length > 0) {
      throw {
        status: 400,
        error: "Campos obligatorios faltantes",
        detalle: `Faltan: ${faltantes.join(", ")}`,
      };
    }
    const existeNombre = await examenes.existeNombre(dataEnv.nombre);

    const existeAbreviatura = await examenes.buscarExamen(dataEnv.abreviatura);
    if (existeAbreviatura || existeNombre) {
      throw {
        status: 409,
        error: "El examen que está intentando ingresar ya existe",
        detalle: `Verifique si ya existe el tipo de examen que está intentando añadir`,
      };
    }

    const examenCreado = await examenes.crearExamenNuevo(dataEnv);
    return examenCreado;
  }

  // Eliminar el examen que quiera
  static async eliminarExamen(abbrevEnv) {
    if (!abbrevEnv || abbrevEnv.length !== 3) {
      throw {
        status: 400,
        error: "Abreviatura requerida",
        detalle: "La abreviatura debe contener tres (03) letras",
      };
    }

    const existe = await examenes.buscarExamen(abbrevEnv);
    if (!existe) {
      throw {
        status: 404,
        error: "Examen no encontrado",
        detalle: `No existe el examen con la abreviatura ${abbrevEnv}`,
      };
    }

    const examenEliminado = await examenes.delete(abbrevEnv);
    return examenEliminado;
  }
}

module.exports = Controller;
