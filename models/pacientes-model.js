const pacientes = require(`../db/pacientes-db`);
const { v4: uuidv4 } = require("uuid");

class Pacientes {
  static async todos() {
    return pacientes;
  }

  static async buscarCedula(cedulaValor) {
    return (
      pacientes.find((pacientes) => pacientes.cedula === cedulaValor) || null
    );
  }

  static async crearPaciente(pacientesData) {
    const nuevoPacientes = {
      id: uuidv4(),
      cedula: pacientesData.cedula,
      nombre: pacientesData.nombre,
      apellido: pacientesData.apellido,
      sexo: pacientesData.sexo,
      fechaNacimiento: pacientesData.fechaNacimiento,
      telefono: pacientesData.telefono || "",
      email: pacientesData.email || "",
      direccion: pacientesData.direccion || "",
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    pacientes.push(nuevoPacientes);
    return nuevoPacientes;
  }

  static async actualizar(cedulaActual, pacientesData) {
    const pacientesIndex = pacientes.findIndex(
      (c) => c.cedula === cedulaActual,
    );

    if (pacientesIndex === -1) return null;

    const pacientesActualizado = {
      ...pacientes[pacientesIndex],
      ...pacientesData,
      cedula: pacientesData.cedula || cedulaActual,
    };

    pacientes[pacientesIndex] = pacientesActualizado;
    return pacientesActualizado;
  }

  static async delete(cedula) {
    const pacientesIndex = pacientes.findIndex(
      (p) => p.cedula === cedula,
    );

    if (pacientesIndex === -1) return null;

    const [pacientesEliminado] = pacientes.splice(pacientesIndex, 1);
    return pacientesEliminado;
  }

  static async buscarId(idEnv) {
    return pacientes.find((c) => c.id.startsWith(idEnv)) || null;
  }

  static async ultimosCinco() {
    const pacientesOrdenados = [...pacientes];
    pacientesOrdenados.sort((a, b) => {
      return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
    });
    return pacientesOrdenados.slice(0, 5);
  }
}

module.exports = Pacientes;
