const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '');
    } else if (req.cookies.token) {
        token = req.cookies.token;
    } else {
        return res.status(401).json({ error: 'Token requerido', detalle: 'Envíe un token en el header Authorization' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido', detalle: 'El token no es válido o expiró' });
    }
}

function checkNivel(...nivelesPermitidos) {
    return function (req, res, next) {
        const nivel = req.usuario?.nivel;

        if (!nivel) {
            return res.status(403).json({ error: 'Sin nivel', detalle: 'No se encontró el nivel de cuenta en el token' });
        }

        if (!nivelesPermitidos.includes(nivel)) {
            return res.status(403).json({ error: 'Sin permisos', detalle: `Se requiere nivel: ${nivelesPermitidos.join(' o ')}` });
        }

        next();
    }
}

function checkVista(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
}

module.exports = { checkLogin, checkNivel, checkVista };
//modo de uso const { checkLogin, checkNivel, checkVista } = require('../utils/auth.js');
//router.get('/', checkLogin, checkNivel('(nivel que le des a la ruta)'), async (req, res) => { //continua el codigo normal 