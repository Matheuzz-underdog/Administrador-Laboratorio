const examenes = require(`../db/examenes-db`);
const generar = require("../utils/generarExID");

class Examenes {
  static async listaTotal() {
    return examenes;
  }

  static async buscarExamen(abbrev) {
    return examenes.find((ex) => ex.abreviatura === abbrev) || null;
  }

  static async delete(abbrev) {
    const examenIndex = examenes.findIndex((ex) => ex.abreviatura === abbrev);

    if (examenIndex === -1) return null;

    const [examenEliminado] = examenes.splice(examenIndex, 1);
    return examenEliminado;
  }

  static async crearExamenNuevo(data) {
    const nuevoID = generar(examenes);

    const nuevoExamen = {
      id: nuevoID,
      nombre: data.nombre,
      abreviatura: data.abreviatura,
      area: data.area,
      precio: data.precio,
      tipoMuestra: data.tipoMuestra,
      parametros: data.parametros,
    };

    examenes.push(nuevoExamen);
    return nuevoExamen;
  }
}

module.exports = Examenes;
