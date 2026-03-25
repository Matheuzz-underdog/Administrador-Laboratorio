const mysql = require("mysql");
const db = require("../connections/connection");
const generar = require("../utils/generarExID");

class Examenes {
  static async listaTotal() {
    const sql = `
      SELECT
        e.*,
        p.id_parametro,
        p.nombre_parametro,
        p.unidad_parametro,
        p.referencia_parametro,
        p.sexo
      FROM examenes e
      LEFT JOIN parametros_examen p
        ON e.abreviatura_examen = p.abreviatura_examen
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        const mapa = {};
        rows.forEach((row) => {
          if (!mapa[row.abreviatura_examen]) {
            mapa[row.abreviatura_examen] = {
              id_examen:          row.id_examen,
              nombre_examen:      row.nombre_examen,
              abreviatura_examen: row.abreviatura_examen,
              area_examen:        row.area_examen,
              precio_examen:      row.precio_examen,
              tipo_muestra:       row.tipo_muestra,
              parametros:         [],
            };
          }

          if (row.id_parametro !== null) {
            mapa[row.abreviatura_examen].parametros.push({
              nombre:     row.nombre_parametro,
              unidad:     row.unidad_parametro,
              referencia: row.referencia_parametro,
              sexo:       row.sexo,
            });
          }
        });

        resolve(Object.values(mapa));
      });
    });
  }
  
  static async contar() {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) FROM examenes", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    })
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
    const sql = `
      SELECT
        e.*,
        p.id_parametro,
        p.nombre_parametro,
        p.unidad_parametro,
        p.referencia_parametro,
        p.sexo
      FROM examenes e
      LEFT JOIN parametros_examen p
        ON e.abreviatura_examen = p.abreviatura_examen
      WHERE e.abreviatura_examen = ?
    `;

    return new Promise((resolve, reject) => {
      db.query({ sql, timeout: 10000 }, [abbrev], (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);

        const examen = {
          id_examen:          rows[0].id_examen,
          nombre_examen:      rows[0].nombre_examen,
          abreviatura_examen: rows[0].abreviatura_examen,
          area_examen:        rows[0].area_examen,
          precio_examen:      rows[0].precio_examen,
          tipo_muestra:       rows[0].tipo_muestra,
          parametros:         [],
        };

        rows.forEach((row) => {
          if (row.id_parametro !== null) {
            examen.parametros.push({
              nombre:     row.nombre_parametro,
              unidad:     row.unidad_parametro,
              referencia: row.referencia_parametro,
              sexo:       row.sexo,
            });
          }
        });

        resolve([examen]);
      });
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
    const info = await this.listaTotal();
    const nuevoID = generar(info);

    const nuevoExamen = {
      id_examen:          nuevoID,
      nombre_examen:      data.nombre,
      abreviatura_examen: data.abreviatura,
      area_examen:        data.area,
      precio_examen:      data.precio,
      tipo_muestra:       data.tipoMuestra,
    };

    await new Promise((resolve, reject) => {
      db.query("INSERT INTO examenes SET ?", nuevoExamen, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (data.parametros && data.parametros.length > 0) {
      for (const param of data.parametros) {
        const nuevoParam = {
          abreviatura_examen:   data.abreviatura,
          nombre_parametro:     param.nombre,
          unidad_parametro:     param.unidad     || "",
          referencia_parametro: param.referencia || "",
          sexo: param.sexo || "ambos",
        };

        await new Promise((resolve, reject) => {
          db.query("INSERT INTO parametros_examen SET ?", nuevoParam, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      }
    }
  }
}

module.exports = Examenes;