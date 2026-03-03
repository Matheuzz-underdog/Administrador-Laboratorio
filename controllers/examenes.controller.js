const examenes = require("../models/examenes.model");
const valid = require("../utils/validator")

class Controller {
  static async mostrarTodos() {
    const listaExamenes = await examenes.listaTotal();
    return listaExamenes.reverse();
  }

  // busca examen por abrev
  static async buscarExamenDeseado(abbrevEnv) {
    if (!abbrevEnv || !valid.longitud(abbrevEnv.trim())) {
      throw {
        status: 400,
        error: "Abreviatura requerida",
        detalle: "Debería verse algo como: GLU (glucosa)",
      };
    }

    const examen = await examenes.buscarExamen(abbrevEnv.trim().toUpperCase());
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

    const camposTexto = ["nombre", "abreviatura", "area", "tipoMuestra"];
    for (let campo of camposTexto) {
      if (!dataEnv[campo] || typeof dataEnv[campo] !== 'string' || dataEnv[campo].trim() === '') {
        throw {
          status: 400,
          error: `El campo ${campo} no puede estar vacío`,
          detalle: `Ingrese un valor válido para ${campo}.`,
        };
      }
    }

    if (typeof dataEnv.precio !== 'number' || dataEnv.precio <= 0) {
      throw {
        status: 400,
        error: "Precio inválido",
        detalle: "El precio debe ser un número mayor a cero.",
      };
    }

    
    if (!Array.isArray(dataEnv.parametros)) {
      throw {
        status: 400,
        error: "Parámetros inválidos",
        detalle: "El campo 'parametros' debe ser una lista.",
      };
    }

    
    for (let i = 0; i < dataEnv.parametros.length; i++) {
      const p = dataEnv.parametros[i];
      if (!p.nombre || typeof p.nombre !== 'string' || p.nombre.trim() === '') {
        throw {
          status: 400,
          error: "Parámetro sin nombre",
          detalle: `El parámetro en la posición ${i + 1} no tiene un nombre válido.`,
        };
      }
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
