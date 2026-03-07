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
                  if (err) throw err;
                  return `Orden creada con el id ${idInsertAnterior}`;
                });
              },
            );
          });
        },
      );
    });
  }

  static async eliminar(id) {
    await db.query(
      "DELETE FROM ordenes_servicio WHERE id_orden = ?",
      [id],
      (err) => {
        if (err) throw err;
      },
    );
    return `Se ha eliminado la orden con el ID #${id}`;
  }

  static async eliminarDetalle(id) {
    const detalle = await this.buscarDetalle(id);
    const ordenServicio = await this.buscarId(detalle[0].id_orden);

    const nuevoMontoTotal =
      ordenServicio[0].monto_total - detalle[0].precio_historico;

    await db.query(
      "UPDATE ordenes_servicio SET monto_total = ? WHERE id_orden = ?",
      [nuevoMontoTotal, detalle[0].id_orden],
      (err, result) => {
        if (err) throw err;
      },
    );
    await db.query(
      "DELETE FROM detalle_orden WHERE id_detalle = ?",
      [id],
      (err, result) => {
        if (err) throw err;
      },
    );
    return `Se ha eliminado el detalle con ID #${id}. Se ha actualizado el monto total de la Orden #${detalle[0].id_orden}`;
  }

  // modifica ordenes_servicio
  static async actualizar(id, datos) {
    if (datos.cedula_paciente && !datos.cedula_empleado) {
      await db.query(
        "UPDATE ordenes_servicio SET cedula_paciente = ? WHERE id_orden = ?",
        [datos.cedula_paciente, id],
        (err) => {
          if (err) throw err;
        },
      );
      return `Se ha actualizado la orden con la nueva cédula del paciente -> ${datos.cedula_paciente}`;
    }
    if (datos.cedula_empleado && !datos.cedula_paciente) {
      await db.query(
        "UPDATE ordenes_servicio SET cedula_empleado = ? WHERE id_orden = ?",
        [datos.cedula_empleado, id],
        (err) => {
          if (err) throw err;
        },
      );
      return `Se ha actualizado la orden con la nueva cédula del empleado -> ${datos.cedula_empleado}`;
    }
    await db.query(
      "UPDATE ordenes_servicio SET cedula_paciente = ?, cedula_empleado = ? WHERE id_orden = ?",
      [datos.cedula_paciente, datos.cedula_empleado, id],
      (err) => {
        if (err) throw err;
      },
    );
    return `Se ha actualizado la orden con las nuevas cédulas: ${datos.cedula_paciente} | ${datos.cedula_empleado}`;
  }

  static async cambiar(id, cambiar) {
    await db.query(
      "UPDATE ordenes_servicio SET estado_pago = ? WHERE id_orden = ?",
      [cambiar, id],
      (err) => {
        if (err) throw err;
      },
    );
    return `Se cambió el estado de la orden con el ID #${id} a ${cambiar}`
  }

  // idk
  // static async comprobarExistenciaEnOrden(cedulaPaciente, cedulaEmpleado) {
  //   if (cedulaPaciente && !cedulaEmpleado) {
  //     return new Promise((resolve, reject) => {
  //       db.query(
  //         "SELECT * FROM ordenes_servicio WHERE",
  //         [datos.cedula_paciente, id],
  //         (err, resultf) => {
  //           if (err) reject(err);
  //           resolve(result);
  //         },
  //       );
  //     });
  //   }
  // }
}

module.exports = Ordenes;
