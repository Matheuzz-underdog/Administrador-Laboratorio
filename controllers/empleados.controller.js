const Empleados = require("../models/empleados-model.js");
const ValidadorEm = require("../utils/validadorEm.js");

class ControladorEm {
    static async mostrarTodos() { //muestra todos
        try {
            const resultado = await Empleados.mostrarTodosEm();
            return resultado;
        }catch(err){
            console.log(`Ha ocurrido el siguiente error al buscar todos los empleados: ${err}`);
        }
    }
    
    static async buscarCed(cedula){ //busca por cedula 
        if (!cedula) {
            throw {
                status: 400,
                error: "Cédula requerida",
                detalle: "Envíe la cédula en el body: {'cedula': V-12345678}",
            }
        }

        if (!ValidadorEm.cedula(cedula)) {
            throw {
                status: 400,
                error: "Formato de cédula inválida",
                detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
            };
        }
        
        const empleado = await Empleados.buscarPorCedEm(cedula);

        if (!empleado) {
            throw {
                status: 404,
                error: "Empleado no encontrado",
                detalle: `No existe el empleado con la cédula: ${cedula}`,
            };
        }

        return empleado;
    }
    
    static async buscarNum(numero) { //busca por numero
        if (!numero) {
            throw {
                status: 400,
                error: "Número requerido",
                detalle: "Envíe el número en el body: {'número': XXXX-XXXXXXX}",
            }
        }

        if (!ValidadorEm.telefono(numero)) {
            throw {
                status: 400,
                error: "Formato de número telefonico invalido",
                detalle: "Formato requerido: XXXX-XXXXXXX",
            };
        }
        
        const empleado = await Empleados.buscarPorNumEm(numero);

        if (!empleado) {
            throw {
                status: 404,
                error: "Empleado no encontrado",
                detalle: `No existe el empleado con el número telefonico: ${numero}`,
            };
        }

        return empleado;
    }
    
    static async validarDatos(datosEm, agg) { //valida los datos para agregar o actualizar
        if (!datosEm || Object.keys(datosEm).length === 0) {
            throw {
                status: 400,
                error: "Datos del empleado requeridos",
                detalle: "Envíe los datos del empleado en formato JSON",
            };
        }

        const obligatorios = ["cedula", "nombre", "apellido", "cargo", "telefono", "email", "actividad", "datos"];
        const faltantes = obligatorios.filter((campo) => !datosEm[campo]);

        if (faltantes.length > 0) {
            throw {
                status: 400,
                error: "Campos obligatorios faltantes",
                detalle: `Faltan los siguientes campos: ${faltantes.join(", ")}`,
            };
        }

        if (!ValidadorEm.cedula(datosEm.cedula)) {
            throw {
                status: 400,
                error: "Cédula inválida",
                detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
            };
        }

        if (!ValidadorEm.telefono(datosEm.telefono)) {
            throw {
                status: 400,
                error: "Número telefonico inválido",
                detalle: "Formato requerido: XXXX-XXXXXXX",
            };
        }

        if (agg === true) {
            const duplicado = await Empleados.buscarPorCedEm(datosEm.cedula);
            if (duplicado.length > 0) {
                throw {
                    status: 409,
                    error: "Cédula duplicada",
                    detalle: `Ya existe un empleado con la cédula ${datosEm.cedula} registrada`,
                };
            }
        }
        

        if (datosEm.email && !ValidadorEm.email(datosEm.email)) {
            throw {
                status: 400,
                error: "Formato de Email invalido",
                detalle: "Use formato valido: usuario@dominio.com",
            };
        }

        if (!ValidadorEm.actividad(datosEm.actividad)) {
            throw {
                status: 400,
                error: "Formato de actividad invalido",
                detalle: "La actividad del empleado debe ser un 1(activo) o un 0(inactivo)",
            };
        }

        if (ValidadorEm.json(datosEm.datos) === 0) {
            throw {
                status: 400,
                error: "Formato de datos profesionales invalido",
                detalle: "El formato debe ser un JSON",
            }
        } else if (ValidadorEm.json(datosEm.datos) === 2) {
            const formatoValido = JSON.stringify(datosEm.datos)
            datosEm.datos = formatoValido
        }

        console.log("todos los datos son validos")
        return true
    }

    static async crear(datos) { //crea empleado
        try {
            const verificar = await this.validarDatos(datos, true);
            if (verificar) {
                
                const resultado = await Empleados.crearEm(datos)
                return resultado
            } 
        } catch(err) {
            throw err
        }
    }

    static async actualizar(datos) { //actualiza un empleado
        try {

            const verificar = await this.validarDatos(datos, false);

            const existe = await Empleados.buscarPorCedEm(datos.cedula);
            if (existe.length === 0) {
                throw {
                    status: 404,
                    error: "Empleado no encontrado",
                    detalle: `No existe empleado con cédula ${datos.cedula}`,
                }
            }
            if (verificar) {
                const resultado = await Empleados.actualizarEmCed(datos.cedula, datos)
                return resultado
            }
        }catch(err){
            throw err
        }
    }

    static async borrar(cedula) { //borra por cedula
        try {
            if (!ValidadorEm.cedula(cedula)) {
                throw {
                    status: 400,
                    error: "Cédula inválida",
                    detalle: "Formato requerido: V-XXXXXXXX (6-8 dígitos)",
                };
            }

            const existe = await Empleados.buscarPorCedEm(cedula);
            if (existe.length === 0) {
                throw {
                    status: 404,
                    error: "Empleado no encontrado",
                    detalle: `No existe empleado con cédula ${cedula}`,
                }
            }

            const resultado = await Empleados.borrarCedEm(cedula);
            return resultado;
        }catch(err){
            throw err
        }
    }
}

const empleado = { 
    "id": "fdf96f35-2c76-4c35-bcf8-4d2cfcc39851",
    "cedula": "V-63786223",
    "nombre": "nelsoon",
    "apellido": "sandovaaal",
    "cargo": "cajero",
    "telefono": "0424-7166504",
    "email": "nelsoooon@gmail.com",
    "actividad": "1",
    "datos": {
        "primero": "segundo",
        "tercero": "cuarto"
        }
}

ControladorEm.crear(empleado)
.then((res)=> {
    console.log(res)
}).catch((err)=> {
    console.log(err)
})

module.exports = ControladorEm;
