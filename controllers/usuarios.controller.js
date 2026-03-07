const Usuarios = require('../models/usuarios.model.js');
const valid = require('../utils/validator.js');

class UsuariosController {

    static async verTodos() {
        const todos = await Usuarios.todos();
        return todos;
    }

    static async buscarPorCedula(cedula) {
        if (!cedula) {
            throw { status: 400, error: 'Cédula requerida', detalle: 'Envíe una cédula' };
        }

        if (!valid.cedula(cedula)) {
            throw { status: 400, error: 'Formato de cédula inválido', detalle: 'Formato requerido: V-XXXXXXXX (6-8 dígitos)' };
        }

        const usuario = await Usuarios.buscarPorCedula(cedula);
        if (usuario.length === 0) {
            throw { status: 404, error: 'Usuario no encontrado', detalle: `No existe un usuario con cédula: ${cedula}` };
        }

        return usuario;
    }

    static async registrar(datos) {
        if (!datos || Object.keys(datos).length === 0) {
            throw { status: 400, error: 'Datos requeridos', detalle: 'Envíe los datos del usuario en formato JSON' };
        }

        const obligatorios = ['cedula', 'password', 'nivel_cuenta'];
        const faltantes = obligatorios.filter((campo) => !datos[campo]);
        if (faltantes.length > 0) {
            throw { status: 400, error: 'Campos obligatorios faltantes', detalle: `Faltan: ${faltantes.join(', ')}` };
        }

        if (!valid.cedula(datos.cedula)) {
            throw { status: 400, error: 'Formato de cédula inválido', detalle: 'Formato requerido: V-XXXXXXXX (6-8 dígitos)' };
        }

        const nivelesValidos = ['lector', 'editor', 'admin'];
        if (!nivelesValidos.includes(datos.nivel_cuenta)) {
            throw { status: 400, error: 'Nivel de cuenta inválido', detalle: 'Los niveles válidos son: lector, editor, admin' };
        }

        const existe = await Usuarios.buscarPorCedula(datos.cedula);
        if (existe.length > 0) {
            throw { status: 409, error: 'Usuario duplicado', detalle: `Ya existe un usuario con la cédula ${datos.cedula}` };
        }

        const usuarioCreado = await Usuarios.registrar(datos);
        return usuarioCreado;
    }

    static async login(datos) {
        if (!datos.cedula || !datos.password) {
            throw { status: 400, error: 'Datos requeridos', detalle: 'Envíe cédula y contraseña' };
        }

        if (!valid.cedula(datos.cedula)) {
            throw { status: 400, error: 'Formato de cédula inválido', detalle: 'Formato requerido: V-XXXXXXXX (6-8 dígitos)' };
        }

        const token = await Usuarios.login(datos);
        return token;
    }

    static async eliminar(cedula) {
        if (!cedula) {
            throw { status: 400, error: 'Cédula requerida', detalle: 'Envíe una cédula' };
        }
        if (!valid.cedula(cedula)) {
            throw { status: 400, error: 'Formato de cédula inválido', detalle: 'Formato requerido: V-XXXXXXXX (6-8 dígitos)' };
        }

        const existe = await Usuarios.buscarPorCedula(cedula);
        if (existe.length === 0) {
            throw { status: 404, error: 'Usuario no encontrado', detalle: `No existe un usuario con cédula: ${cedula}` };
        }

        const eliminado = await Usuarios.eliminar(cedula);
        return eliminado;
    }

}

module.exports = UsuariosController;