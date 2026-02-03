const clientes = require("../models/clientes-model");

const validarCedula = (cedula) => {
  const formato = /^V-\d{6,8}$/;
  return formato.test(cedula);
};

const validarFecha = (fecha) => {
  const formato = /^\d{4}-\d{2}-\d{2}$/;
  if (!formato.test(fecha)) return false;

  const fechaObj = new Date(fecha);
  return fechaObj instanceof Date && !isNaN(fechaObj);
};

const validarEmail = (email) => {
  if (!email) return true;
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formato.test(email);
};

const mostrarTodos = async () => {
  const datos = await clientes.todos();
  return datos;
};

const buscarPorCedula = async (cedula) => {
  if (!cedula) {
    throw {
      status: 400,
      error: "Cédula requerida",
      detalle: 'Envíe la cédula en el body: {"cedula": "V-12345678"}',
    };
  }

  if (!validarCedula(cedula)) {
    throw {
      status: 400,
      error: "Cédula inválida",
      detalle: "Formato: V-12345678 (6-8 dígitos)",
    };
  }

  const cliente = await clientes.buscarCedula(cedula);

  if (!cliente) {
    throw {
      status: 404,
      error: "Cliente no encontrado",
      detalle: `No existe cliente con cédula ${cedula}`,
    };
  }

  return cliente;
};

const crearCliente = async (data) => {
  if (!data || Object.keys(data).length === 0) {
    throw {
      status: 400,
      error: "Datos requeridos",
      detalle: "Envíe los datos del cliente en formato JSON",
    };
  }

  const obligatorios = ["cedula", "nombre", "apellido", "fechaNacimiento"];
  const faltantes = obligatorios.filter((campo) => !data[campo]);

  if (faltantes.length > 0) {
    throw {
      status: 400,
      error: "Campos obligatorios faltantes",
      detalle: `Faltan: ${faltantes.join(", ")}`,
    };
  }

  if (!validarCedula(data.cedula)) {
    throw {
      status: 400,
      error: "Cédula inválida",
      detalle: "Formato: V-12345678 (6-8 dígitos)",
    };
  }

  const existe = await clientes.buscarCedula(data.cedula);
  if (existe) {
    throw {
      status: 409,
      error: "Cédula duplicada",
      detalle: `La cédula ${data.cedula} ya está registrada`,
    };
  }

  if (!validarFecha(data.fechaNacimiento)) {
    throw {
      status: 400,
      error: "Fecha inválida",
      detalle: "Use formato YYYY-MM-DD",
    };
  }

  if (data.email && !validarEmail(data.email)) {
    throw {
      status: 400,
      error: "Email invalido",
      detalle: "Use formato valido: usuario@dominio.com",
    };
  }

  const clienteCreado = await clientes.crearCliente(data);
  return clienteCreado;
};

const eliminarCliente = async (cedula) => {
  if (!validarCedula(cedula)) {
    throw {
      status: 400,
      error: "Cédula inválida",
      detalle: "Formato: V-12345678",
    };
  }

  const clienteExistente = await clientes.buscarCedula(cedula);
  if (!clienteExistente) {
    throw {
      status: 404,
      error: "Cliente no encontrado",
      detalle: `No existe cliente con cédula ${cedula}`,
    };
  }

  const clienteEliminado = await clientes.delete(cedula);
  return clienteEliminado;
};

const ultimosCinco = async () => {
  const ultimos = await clientes.ultimosCinco();
  return ultimos;
};

const buscarPorID = async (id) => {
  if (!id || id.length !== 5) {
    throw {
      status: 400,
      error: "ID inválido",
      detalle: "El ID debe tener exactamente 5 caracteres",
    };
  }

  const cliente = await clientes.buscarId(id);

  if (!cliente) {
    throw {
      status: 404,
      error: "Cliente no encontrado",
      detalle: `No existe cliente con ID que empiece por ${id}`,
    };
  }

  return cliente;
};

const actualizarCliente = async (cedula, nuevosDatos) => {
  if (!validarCedula(cedula)) {
    throw {
      status: 400,
      error: "Cédula inválida en URL",
      detalle: "Formato: V-12345678",
    };
  }

  const clienteExistente = await clientes.buscarCedula(cedula);
  if (!clienteExistente) {
    throw {
      status: 404,
      error: "Cliente no encontrado",
      detalle: `No existe cliente con cédula ${cedula}`,
    };
  }

  if (nuevosDatos.cedula && nuevosDatos.cedula !== cedula) {
    if (!validarCedula(nuevosDatos.cedula)) {
      throw {
        status: 400,
        error: "Nueva cédula inválida",
        detalle: "Formato: V-12345678",
      };
    }

    const existeNuevaCedula = await clientes.buscarCedula(nuevosDatos.cedula);
    if (existeNuevaCedula) {
      throw {
        status: 409,
        error: "Cédula duplicada",
        detalle: `La cédula ${nuevosDatos.cedula} ya está registrada`,
      };
    }
  }

  if (nuevosDatos.fechaNacimiento && !validarFecha(nuevosDatos.fechaNacimiento)) {
    throw {
      status: 400,
      error: "Fecha inválida",
      detalle: "Use formato YYYY-MM-DD",
    };
  }

  if (nuevosDatos.email && !validarEmail(nuevosDatos.email)) {
    throw {
      status: 400,
      error: "Email inválido",
      detalle: "Use formato válido",
    };
  }

  const clienteActualizado = await clientes.actualizar(cedula, nuevosDatos);

  if (!clienteActualizado) {
    throw {
      status: 500,
      error: "Error al actualizar",
      detalle: "No se pudo actualizar el cliente",
    };
  }

  return clienteActualizado;
};

module.exports = {
  mostrarTodos,
  crearCliente,
  buscarPorCedula,
  buscarPorID,
  actualizarCliente,
  eliminarCliente,
  ultimosCinco,
};