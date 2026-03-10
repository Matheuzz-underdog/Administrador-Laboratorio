const { v4: uuidv4 } = require('uuid');
const db = require('../connections/connection.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError.js');
const saltRounds = 10;

class Usuarios {

    static async todos() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async buscarPorCedula(cedula) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM usuarios WHERE cedula = ?',
                [cedula],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static async buscarEmpleadoPorCedula(cedula) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT id_empleado FROM empleados WHERE cedula_empleado = ?',
                [cedula],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static async registrar(datos) {
        const empleado = await this.buscarEmpleadoPorCedula(datos.cedula);

        if (empleado.length === 0) 
            throw { status: 404, error: 'Empleado no encontrado', detalle: `No existe un empleado con cédula ${datos.cedula}` };

        const nuevoUsuario = {
            id_usuario: uuidv4(),
            cedula: datos.cedula,
            password: bcrypt.hashSync(datos.password, saltRounds),
            nivel_cuenta: datos.nivel_cuenta || 'lector',
            id_empleado: empleado[0].id_empleado
        };

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO usuarios SET ?', [nuevoUsuario], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async login(datos) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM usuarios WHERE cedula = ?',
                [datos.cedula],
                (err, results) => {
                    if (err) return reject(err);
                    if (results.length === 0) return reject({ status: 404, error: 'Usuario no encontrado' });

                    if (bcrypt.compareSync(datos.password, results[0].password)) {
                        const token = jwt.sign(
                            {
                                id: results[0].id_usuario,
                                nivel: results[0].nivel_cuenta,
                                id_empleado: results[0].id_empleado
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: '8h' }
                        );
                        resolve(token);
                    } else {
                        reject({ status: 401, error: 'Contraseña incorrecta' });
                    }
                }
            );
        });
    }

    static async eliminar(cedula) {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM usuarios WHERE cedula = ?',
                [cedula],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    static async actualizar(cedula, datos) {
        const datosNuevos = {};

        if (datos.password) {
            datosNuevos.password = bcrypt.hashSync(datos.password, saltRounds);
        }
        if (datos.nivel_cuenta) {
            datosNuevos.nivel_cuenta = datos.nivel_cuenta;
        }

        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE usuarios SET ? WHERE cedula = ?',
                [datosNuevos, cedula],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }
}

module.exports = Usuarios;