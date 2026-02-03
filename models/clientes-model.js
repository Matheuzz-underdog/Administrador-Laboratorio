const laboratorio = require(`../db/database`);
const { v4: uuidv4 } = require("uuid");

class clientes {
  static async todos() {
    return laboratorio.clientes;
  }

  static async buscarCedula(cedulaValor) {
    return (
      laboratorio.clientes.find(
        (cliente) => cliente.cedula === cedulaValor,
      ) || null
    );
  }

  static async crearCliente(clienteData) {
    const nuevoCliente = {
      id: uuidv4(),
      cedula: clienteData.cedula,
      nombre: clienteData.nombre,
      apellido: clienteData.apellido,
      fechaNacimiento: clienteData.fechaNacimiento,
      telefono: clienteData.telefono || "",
      email: clienteData.email || "",
      direccion: clienteData.direccion || "",
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    laboratorio.clientes.push(nuevoCliente);
    return nuevoCliente;
  }

  static async actualizar(cedulaActual, clienteData) {
    const clienteIndex = laboratorio.clientes.findIndex(
      (c) => c.cedula === cedulaActual,
    );

    if (clienteIndex === -1) return null;

    const clienteActualizado = {
      ...laboratorio.clientes[clienteIndex],
      ...clienteData,
      cedula: clienteData.cedula || cedulaActual,
    };

    laboratorio.clientes[clienteIndex] = clienteActualizado;
    return clienteActualizado;
  }

  static async delete(cedula) {
    const clienteIndex = laboratorio.clientes.findIndex(
      (cliente) => cliente.cedula === cedula,
    );

    if (clienteIndex === -1) return null;

    const [clienteEliminado] = laboratorio.clientes.splice(clienteIndex, 1);
    return clienteEliminado;
  }

  static async buscarId(idEnv) {
    return laboratorio.clientes.find((c) => c.id.startsWith(idEnv)) || null;
  }

  static async ultimosCinco() {
    const clientesOrdenados = [...laboratorio.clientes];
    clientesOrdenados.sort((a, b) => {
      return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
    });
    return clientesOrdenados.slice(0, 5);
  }
}

module.exports = clientes;