const ordenesModel = require("../../models/ordenes.model");

class Controller {
  static async todasOrdenes() {
    const ordenes = await ordenesModel.todos();
    return ordenes;
  }
  static async buscarOrden(id) {
    console.log(id.typeOf());

    const ordenDeseada = await ordenesModel.buscarID(id);
    
    if (!ordenDeseada) {
      throw {
        status: 404,
        error: "Examen no encontrado",
        detalle: `No se encontró un examen con la abreviatura ${abbrevEnv}`,
      };
    }
  }
}

module.exports = Controller;
