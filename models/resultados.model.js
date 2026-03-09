const db = require("../connections/connection");

class Resultados {
  static async todos() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM resultado_examenes", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async borrar(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM resultado_examenes WHERE id_resultado = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(`Se ha borrado exitosamente el resultado con ID #${id}`);
      })
    })
  }

  static async crear(datos) {
    return new Promise((resolve, reject) => {
      db.query(
      "INSERT INTO resultado_examenes SET ?",
      [datos],
      (err, result) => {
        if (err) reject(err);
         resolve(`Se ha creado un nuevo resultado exitosamente con el ID #${result.insertId}`)
      },
    );
    })
  }

  // idk

  // lo uso para comprobar existencia del resultado
  static async buscarPorDetalle(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM resultado_examenes WHERE id_detalle = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }
  static async buscarPorResultado(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM resultado_examenes WHERE id_resultado = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }
}

module.exports = Resultados;
