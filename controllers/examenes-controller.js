const examenes = require("../models/examenes-model");

class Controller {
  static async mostrarTodos() {
    const listaExamenes = await examenes.listaTotal();
    return listaExamenes;
  }

  // busca examen por abrev
  static async buscarExamenDeseado(abbrevEnv) {
    if (!abbrevEnv || abbrevEnv.length !== 3) {
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
    if (dataEnv.abreviatura.length !== 3) {
      throw {
        status: 400,
        error: "La abreviatura debe poseer 3 letras (mayúsculas)",
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

    const existe = await examenes.buscarExamen(dataEnv.abreviatura);
    if (existe) {
      throw {
        status: 409,
        error: "Abreviatura duplicada",
        detalle: `La abreviatura ${dataEnv.abreviatura} ya está registrada (checkear si el tipo de examen ya existe/está mal registrado)`,
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
