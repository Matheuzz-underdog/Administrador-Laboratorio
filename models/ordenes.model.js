const db = require("../connections/connection");
const { cedula } = require("../utils/validator");

class Ordenes {
  static async todos() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM ordenes_servicio", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async buscar(cedula) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ordenes_servicio WHERE cedula_paciente = ? OR cedula_empleado = ?",
        [cedula, cedula],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async buscarId(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ordenes_servicio WHERE id_orden = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }
  //MEJORAAAAAAARRR
  static async buscarDetalle(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM detalle_orden WHERE id_detalle = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async crear(datos) {
    let montoTotal = 0;
    const detalles = datos.orden_detalles;
    Object.values(detalles).forEach((examen) => {
      montoTotal += examen.monto_historico;
    });

    console.log("MONTO TOTAL", montoTotal);

    const datoServicio = {
      cedula_paciente: datos.ordenes_servicio.cedula_paciente,
      cedula_empleado: datos.ordenes_servicio.cedula_empleado,
      monto_total: montoTotal,
      estado_pago: "Pendiente",
    };

    await db.beginTransaction((err) => {
      if (err) throw err;
      db.query(
        "INSERT INTO ordenes_servicio SET ?",
        [datoServicio],
        (err, result) => {
          if (err) throw err;
          const idInsertAnterior = result.insertId;

          Object.values(detalles).forEach((detalle) => {
            db.query(
              "INSERT INTO detalle_orden (id_orden, abreviatura_examen, precio_historico) VALUES (?, ?, ?)",
              [
                idInsertAnterior,
                detalle.abreviatura_examen,
                detalle.monto_historico,
              ],
              (err, result) => {
                if (err) throw err;
                db.commit((err) => {
                  return `Orden creada con el id ${idInsertAnterior}`;
                  if (err) throw err;
                });
              },
            );
          });
        },
      );
    });
  }

  static async eliminar(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM ordenes_servicio WHERE id_orden = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async eliminarDetalle(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM detalle_orden WHERE id_detalle = ?",
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
