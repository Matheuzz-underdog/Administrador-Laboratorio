var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Controller = require("../controllers/empleados.controller");

const usuarioInfo = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const empleado = await Controller.buscarPorCedula(decoded.cedula);

      res.locals.usuario = decoded;
      res.locals.nivel = decoded.nivel;
      res.locals.cedula = decoded.cedula;
      res.locals.nombreEmpleado = empleado[0].nombre_empleado;
      res.locals.apellidoEmpleado = empleado[0].apellido_empleado;
      res.locals.userID = decoded.id;
      res.locals.telefonoUsuario = empleado[0].telefono_empleado;
      res.locals.emailUsuario = empleado[0].email_empleado;
      res.locals.cargoUsuario = empleado[0].cargo_empleado;
    } catch (err) {
      res.locals.nivel = null;
      res.locals.usuario = null;
    }
  } else {
    res.locals.nivel = null;
    res.locals.usuario = null;
  }
  next();
};

module.exports = { usuarioInfo };
