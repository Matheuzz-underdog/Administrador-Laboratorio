const { v4: uuidv4 } = require("uuid");
const db = require("../connections/connection.js");

class Empleados {
  static async todos() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM empleados", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async buscarCedula(cedula) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM empleados WHERE cedula_empleado = ?",
        [cedula],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async crear(datos) {
    const datosFormateados = this.formatearDatosProfesionales(
      datos.datos_profesionales,
    );

    const nuevoEmpleado = {
      id_empleado: uuidv4(),
      cedula_empleado: datos.cedula,
      nombre_empleado: datos.nombre,
      apellido_empleado: datos.apellido,
      cargo_empleado: datos.cargo,
      telefono_empleado: datos.telefono,
      email_empleado: datos.email,
      actividad_empleado: datos.actividad,
      datos_profesionales: datosFormateados,
    };

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO empleados SET ?",
        [nuevoEmpleado],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async actualizar(cedulaActual, empleadoDatos) {
    const sql = "UPDATE empleados SET ? WHERE cedula_empleado = ?";
    const datosNuevos = {};

    if (empleadoDatos.cedula !== undefined)
      datosNuevos.cedula_empleado = empleadoDatos.cedula;
    if (empleadoDatos.nombre !== undefined)
      datosNuevos.nombre_empleado = empleadoDatos.nombre;
    if (empleadoDatos.apellido !== undefined)
      datosNuevos.apellido_empleado = empleadoDatos.apellido;
    if (empleadoDatos.cargo !== undefined)
      datosNuevos.cargo_empleado = empleadoDatos.cargo;
    if (empleadoDatos.telefono !== undefined)
      datosNuevos.telefono_empleado = empleadoDatos.telefono;
    if (empleadoDatos.email !== undefined)
      datosNuevos.email_empleado = empleadoDatos.email;
    if (empleadoDatos.datos_profesionales !== undefined) {
      datosNuevos.datos_profesionales = this.formatearDatosProfesionales(
        empleadoDatos.actividad_empleado,
      );
    }

    return new Promise((resolve, reject) => {
      db.query(sql, [datosNuevos, cedulaActual], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async borradoFisico(cedula) {
    //borrar definitivamente por cedula (no recomendado)
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM empleados WHERE cedula_empleado = ?",
        [cedula],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  static async borradoLogico(cedula, actividad) {
    // borrar actividad
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE empleados SET actividad_empleado = ? WHERE cedula_empleado = ?",
        [actividad, cedula],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  }

  // Extras
  static formatearDatosProfesionales(datos) {
    if (Object.keys(datos).length !== 0) {
      return JSON.stringify(datos.datos_profesionales);
    }
    return null;
  }
}

module.exports = Empleados;
