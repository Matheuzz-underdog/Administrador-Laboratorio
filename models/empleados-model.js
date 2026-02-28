const mysql = require("mysql");
const util = require("util");
const {v4: uuidv4} = require("uuid");
const db = require("../connections/connection.js");
const mapDBToModelEm = require("../utils/mapDBToModelEm.js");

const query = util.promisify(db.query).bind(db);

class Empleados { 
    static async mostrarTodosEm() { //mostrar todos
        try{
            const resultado = await query("SELECT * FROM `empleados`");
            return resultado.map(mapDBToModelEm);
        }catch(err) {
            console.log(`Ha ocurrido el siguiente error: ${err}`)
        }
    }
    
    static async buscarPorNumEm(numero) { //buscar por numero
        try{
            const consulta = "SELECT * FROM `empleados` WHERE telefono_empleado = ?";
            const resultado = await query (consulta, numero);
            return resultado.map(mapDBToModelEm)
        }catch(err){
            console.log(`Ha ocurrido el siguiente error: ${err}`)
        }
    }

    static async buscarPorCedEm(cedula) { //buscar por cedula
        try {
            const consulta = "SELECT * FROM `empleados` WHERE cedula_empleado = ?";
            const rows = await query (consulta, cedula);
            return rows.map(mapDBToModelEm);
        }catch(err){
            console.log(`Ha ocurrido el siguiente error: ${err}`);
        }
    }

    static async crearEm(empleadoDatos){ //crear empleado
        try {
            const id = uuidv4();
            const nuevoEmpleado = {
                id_empleado: id,
                cedula_empleado: empleadoDatos.cedula,
                nombre_empleado: empleadoDatos.nombre,
                apellido_empleado: empleadoDatos.apellido,
                cargo_empleado: empleadoDatos.cargo,
                telefono_empleado: empleadoDatos.telefono || "",
                email_empleado: empleadoDatos.email || "",
                actividad_empleado: empleadoDatos.actividad,
                datos_profesionales: empleadoDatos.datos
            }
            const consulta = "INSERT INTO `empleados` SET ?";
            await query(consulta, nuevoEmpleado);
            return mapDBToModelEm(nuevoEmpleado);
        }catch(err){
            console.log(`Ha ocurrido el siguiente error: ${err}`)
        }
        
    }

    static async actualizarEmCed(cedula, empleadoDatos) { //actualizar empleado
        try {
            const nuevosDatosEmpleado = {
            id_empleado: empleadoDatos.id,
            cedula_empleado: empleadoDatos.cedula,
            nombre_empleado: empleadoDatos.nombre,
            apellido_empleado: empleadoDatos.apellido,
            cargo_empleado: empleadoDatos.cargo,
            telefono_empleado: empleadoDatos.telefono || "",
            email_empleado: empleadoDatos.email || "",
            actividad_empleado: empleadoDatos.actividad,
            datos_profesionales: empleadoDatos.datos
        }

        const consulta = 'UPDATE `empleados` SET ? WHERE cedula_empleado = ?';
        await query(consulta, [nuevosDatosEmpleado, cedula]);
        return mapDBToModelEm(nuevosDatosEmpleado);
        }catch(err) {
            console.log(`Ha ocurrido el siguiente error: ${err}`);
        }
    }

    static async borrarCedEm(cedula) { //borrar por cedula
        try {
            const consulta = 'DELETE FROM `empleados` WHERE cedula_empleado = ?';
            const resultado = await query(consulta, cedula);
            return resultado
        } catch(err) {
            console.log(`Ha ocurrido el siguiente error: ${err}`);
        }
    }
}

module.exports = Empleados;
