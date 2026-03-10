const mysql = require("mysql");
const db = require("../connections/connection");
const generar = require("../utils/generarExID");

class Examenes {
  static async listaTotal() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM examenes", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async listaAbreviaturas() {
    const todosExamenes = await this.listaTotal();
    let valores = [];
    todosExamenes.forEach(examen => {
      valores.push(examen.abreviatura_examen);
    });
    return valores;
  }

  static async buscarExamen(abbrev) {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: "SELECT * FROM `examenes` WHERE `abreviatura_examen` = ?",
          timeout: 10000,
        },
        [abbrev],
        (err, result) => {
          if (err) reject(err);

          if (result.length === 0) resolve(null);
          resolve(result);
        },
      );
    });
  }

  static async delete(abbrev) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM examenes WHERE abreviatura_examen = ?",
        [abbrev],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static async existeNombre(name) {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: "SELECT * FROM `examenes` WHERE `nombre_examen` = ?",
          timeout: 10000,
        },
        [name],
        (err, result) => {
          if (err) reject(err);

          if (result.length === 0) resolve(null);
          resolve(result);
        },
      );
    });
  }

  static async crearExamenNuevo(data) {
    // const nuevoID = generar(
    //   await db.query("SELECT * FROM examenes"),
    // );
    const info = await this.listaTotal();
    const nuevoID = generar(info);

    const nuevoExamen = {
      id_examen: nuevoID,
      nombre_examen: data.nombre,
      abreviatura_examen: data.abreviatura,
      area_examen: data.area,
      precio_examen: data.precio,
      tipo_muestra: data.tipoMuestra,
      parametros: JSON.stringify(data.parametros),
    };
    const sql = "INSERT INTO examenes SET ?";
    await db.query(sql, nuevoExamen);
  }
}

module.exports = Examenes;
