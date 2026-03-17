const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

//    muestra el formulario
router.get('/', (req, res) => {
    // si ya tiene cookie válida lo manda directo al inicio
    if (req.cookies.token) {
        return res.redirect('/');
    }
    res.render('login');
});

//    procesa el formulario
router.post('/', async (req, res) => {
    try {
        const token = await usuariosController.login(req.body);

        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 8 * 60 * 60 * 1000  
        });

        res.redirect('/');

    } catch (err) {
        if (err.status) {
            const mensaje = err.detalle ? `${err.error}: ${err.detalle}` : err.error;
            return res.render('login', { error: mensaje });
        }
        res.render('login', { error: 'Error en el servidor' });
    }
});

//   cierra sesión
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;