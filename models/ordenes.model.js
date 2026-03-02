const db = require("../connections/connection");

class Ordenes {
  static async todos() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM ordenes_servicio", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async buscarID(id) {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: "SELECT * FROM ordenes_servicio WHERE id_orden = ?",
          timeout: 10000,
        },
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }
}

module.exports = Ordenes;
