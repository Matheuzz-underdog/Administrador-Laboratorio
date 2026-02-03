const laboratorio = require(`../db/database`);
const { v4: uuidv4 } = require("uuid");

class pacientes {
  static async todos() {
    return laboratorio.pacientes;
  }

  static async buscarCedula(cedulaValor) {
    return (
      laboratorio.pacientes.find(
        (paciente) => paciente.cedula === cedulaValor,
      ) || null
    );
  }

  static async crearPaciente(pacienteData) {
    const nuevoPaciente = {
      id: uuidv4(),
      cedula: pacienteData.cedula,
      nombre: pacienteData.nombre,
      apellido: pacienteData.apellido,
      fechaNacimiento: pacienteData.fechaNacimiento,
      telefono: pacienteData.telefono || "",
      email: pacienteData.email || "",
      direccion: pacienteData.direccion || "",
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    laboratorio.pacientes.push(nuevoPaciente);
    return nuevoPaciente;
  }

  static async actualizar(cedulaActual, pacienteData) {
    const pacienteIndex = laboratorio.pacientes.findIndex(
      (p) => p.cedula === cedulaActual,
    );

    if (pacienteIndex === -1) return null;

    const pacienteActualizado = {
      ...laboratorio.pacientes[pacienteIndex],
      ...pacienteData,
      cedula: pacienteData.cedula || cedulaActual,
    };

    laboratorio.pacientes[pacienteIndex] = pacienteActualizado;
    return pacienteActualizado;
  }

  static async delete(cedula) {
    const pacienteIndex = laboratorio.pacientes.findIndex(
      (paciente) => paciente.cedula === cedula,
    );

    if (pacienteIndex === -1) return null;

    const [pacienteEliminado] = laboratorio.pacientes.splice(pacienteIndex, 1);
    return pacienteEliminado;
  }

  static async buscarId(idEnv) {
    return laboratorio.pacientes.find((p) => p.id.startsWith(idEnv)) || null;
  }

  static async ultimosCinco() {
    const pacientesOrdenados = [...laboratorio.pacientes];
    pacientesOrdenados.sort((a, b) => {
      return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
    });
    return pacientesOrdenados.slice(0, 5);
  }
}

module.exports = pacientes;
