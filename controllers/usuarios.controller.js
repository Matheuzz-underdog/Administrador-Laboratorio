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

        // Validar password
        const validacionPassword = valid.password(datos.password);
        if (!validacionPassword.valido) {
            throw { status: 400, error: 'Contraseña inválida', detalle: validacionPassword.error };
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

        // Validar password
        const validacionPassword = valid.password(datos.password);
        if (!validacionPassword.valido) {
            throw { status: 400, error: 'Contraseña inválida', detalle: validacionPassword.error };
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

    static async actualizar(cedula, datos) {
        if (!cedula) {
            throw { status: 400, error: 'Cédula requerida', detalle: 'Envíe una cédula' };
        }
        if (!valid.cedula(cedula)) {
            throw { status: 400, error: 'Formato de cédula inválido', detalle: 'Formato requerido: V-XXXXXXXX (6-8 dígitos)' };
        }
        if (!datos || Object.keys(datos).length === 0) {
            throw { status: 400, error: 'Datos requeridos', detalle: 'Envíe los datos a actualizar' };
        }

        const camposValidos = ['password', 'nivel_cuenta'];
        const camposEnviados = Object.keys(datos);
        const camposInvalidos = camposEnviados.filter(c => !camposValidos.includes(c));
        if (camposInvalidos.length > 0) {
            throw { status: 400, error: 'Campos inválidos', detalle: `Solo se puede actualizar: ${camposValidos.join(', ')}` };
        }

        if (datos.nivel_cuenta) {
            const nivelesValidos = ['lector', 'editor', 'admin'];
            if (!nivelesValidos.includes(datos.nivel_cuenta)) {
                throw { status: 400, error: 'Nivel inválido', detalle: 'Los niveles válidos son: lector, editor, admin' };
            }
        }

        // Validar password si se proporciona
        if (datos.password) {
            const validacionPassword = valid.password(datos.password);
            if (!validacionPassword.valido) {
                throw { status: 400, error: 'Contraseña inválida', detalle: validacionPassword.error };
            }
        }

        const existe = await Usuarios.buscarPorCedula(cedula);
        if (existe.length === 0) {
            throw { status: 404, error: 'Usuario no encontrado', detalle: `No existe un usuario con cédula: ${cedula}` };
        }

        const actualizado = await Usuarios.actualizar(cedula, datos);
        return actualizado;
    }

}

module.exports = UsuariosController;