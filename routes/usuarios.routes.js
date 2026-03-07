const express = require('express');
const router = express.Router();
const control = require('../controllers/usuarios.controller.js');
const { checkLogin, checkNivel } = require('../utils/auth.js');

//pues ves a todos pa
router.get('/', checkLogin, checkNivel('admin'), async (req, res) => {
    try {
        if (req.query.cedula) {
            const usuario = await control.buscarPorCedula(req.query.cedula);
            return res.status(200).json({
                message: 'Usuario encontrado',
                data: usuario
            });
        }

        const datos = await control.verTodos();

        if (datos.length === 0) {
            return res.status(200).json({
                message: 'No hay usuarios registrados',
                data: [],
                total: 0
            });
        }

        res.status(200).json({
            message: `${datos.length} usuarios encontrados`,
            total: datos.length,
            data: datos
        });

    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ error: err.error, detalle: err.detalle });
        }
        res.status(500).json({ error: 'Error en servidor al obtener usuarios', detalle: err.message });
    }
});

// Registra a un nuevo desquiciado
router.post('/registro', checkLogin, checkNivel('admin'), async (req, res) => {
    try {
        const usuarioCreado = await control.registrar(req.body);
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            data: usuarioCreado
        });
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ error: err.error, detalle: err.detalle });
        }
        res.status(500).json({ error: 'Error en servidor al registrar usuario', detalle: err.message });
    }
});

// Login 
router.post('/login', async (req, res) => {
    try {
        const token = await control.login(req.body);
        res.status(200).json({
            message: 'Login exitoso',
            token: token
        });
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ error: err.error, detalle: err.detalle });
        }
        res.status(500).json({ error: 'Error en servidor al iniciar sesión', detalle: err.message });
    }
});

// liberas de las cadenas a un ser humano
router.delete('/:cedula', checkLogin, checkNivel('admin'), async (req, res) => {
    try {
        const eliminado = await control.eliminar(req.params.cedula);
        res.status(200).json({
            message: 'Usuario eliminado exitosamente',
            data: eliminado
        });
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ error: err.error, detalle: err.detalle });
        }
        res.status(500).json({ error: 'Error en servidor al eliminar usuario', detalle: err.message });
    }
});

module.exports = router;
