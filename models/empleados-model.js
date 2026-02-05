const empleados = require(`../db/empleados-db`);
const { v4: uuidv4 } = require("uuid");

class Empleados {
  static async verTodos() {
    return empleados;
  }

  static async buscarEmpleado(doc) {
    return empleados.find((empleado) => empleado.cedula === doc) || null;
  }

  static async buscarEmpleadoID(idEnv) {
    return empleados.find((emp) => emp.id.startsWith(idEnv)) || null;
  }

  static async crearEmpleado(data) {
    const nuevoEmpleado = {
      id: uuidv4(),
      cedula: data.cedula,
      nombre: data.nombre,
      apellido: data.apellido,
      cargo: data.cargo,
      telefono: data.telefono || "",
      email: data.email || "",
      activo: true,
      datos_profesionales: {},
    };

    switch (data.cargo) {
      case "Bioanalista":
        nuevoEmpleado.datos_profesionales = {
          colegio_bioanalistas: data.datos_profesionales.colegio_bioanalistas || "Pendiente",
          mpps: data.datos_profesionales.mpps || "",
        };
        break;

      case "Recepcionista":
        nuevoEmpleado.datos_profesionales = {
          turno: data.turno || "Mañana",
          idiomas: data.idiomas || ["Español"],
        };
        break;

      case "Asistente de Laboratorio":
        nuevoEmpleado.datos_profesionales = {
          mpps: data.mpps || "",
          certificacion_flebotomia: data.certificacion || true,
        };
        break;

      default:
        nuevoEmpleado.datos_profesionales = { nota: "Personal operativo" };
    }

    empleados.push(nuevoEmpleado);
    return nuevoEmpleado;
  }

  static async delete(cedula) {
    const empleadoIndex = empleados.findIndex(
      (empleado) => empleado.cedula === cedula,
    );

    if (empleadoIndex === -1) return null;

    const [empleadoEliminado] = empleados.splice(empleadoIndex, 1);
    return empleadoEliminado;
  }

  // Actualizar, cambiado (por cuarta vez)
  static async actualizar(cedulaActual, empleadoData) {
    const empleadoIndex = empleados.findIndex((c) => c.cedula === cedulaActual);

    if (empleadoIndex === -1) return null;

    const empleadoPrevio = empleados[empleadoIndex];

    const empleadoActualizado = {
      ...empleadoPrevio, 
      ...empleadoData,

      datos_profesionales: {
        ...(empleadoPrevio.datos_profesionales || {}),
        ...(empleadoData.datos_profesionales || {}),
      },
      id: empleadoPrevio.id,
      cedula: empleadoData.cedula || cedulaActual,
    };

    empleados[empleadoIndex] = empleadoActualizado;
    return empleadoActualizado;
  }
}

module.exports = Empleados;
