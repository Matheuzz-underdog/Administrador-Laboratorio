const util = require("util");
const { v4: uuidv4 } = require("uuid");
const db = require("../connections/connection");

function clear(dbRow) {
  if (!dbRow) return null;
  return {
    id: dbRow.id_paciente,
    cedula: dbRow.cedula_paciente,
    nombre: dbRow.nombre_paciente,
    apellido: dbRow.apellido_paciente,
    sexo: dbRow.sexo_paciente,
    fechaNacimiento: dbRow.fecha_nacimiento,
    telefono: dbRow.telefono_paciente,
    email: dbRow.email_paciente,
    direccion: dbRow.direccion_paciente,
    fechaRegistro: dbRow.fecha_registro, 
  };
}

// promisificar para poder trabjar con asyn funcions
const query = util.promisify(db.query).bind(db);

// todos
class Pacientes {
  static async todos() {
    try {
      const sql = "SELECT * FROM pacientes";
      const rows = await query(sql);
      return rows.map(clear) //regresa un duplicado legible
    } catch (error) {
      throw new Error(`Error al obtener pacientes: ${error.message}`);
    }
  }

  static async buscarCedula(cedulaValor) {
    try {
      const sql = "SELECT * FROM pacientes WHERE cedula_paciente = ?";
      const rows = await query(sql, [cedulaValor]);
      if (rows.length === 0) return null;
      return clear(rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar paciente por cédula: ${error.message}`);
    }
  }

  static async crearPaciente(pacientesData) {
    try {
      const id = uuidv4();
      const nuevoPacienteDB = {
        // adaptado con los nombres correctos
        id_paciente: id,
        cedula_paciente: pacientesData.cedula,
        nombre_paciente: pacientesData.nombre,
        apellido_paciente: pacientesData.apellido,
        sexo_paciente: pacientesData.sexo,
        fecha_nacimiento: pacientesData.fechaNacimiento,
        telefono_paciente: pacientesData.telefono || "",
        email_paciente: pacientesData.email || "",
        direccion_paciente: pacientesData.direccion || null,
      }; // la db da por defecto la fecha y hora de creacion

      const sql = "INSERT INTO pacientes SET ?";
      await query(sql, nuevoPacienteDB);

      return clear(nuevoPacienteDB); // da el paciente creado en forma de modelo
    } catch (error) {
      throw new Error(`Error al crear paciente: ${error.message}`);
    }
  }

  static async actualizar(cedulaActual, pacientesData) {
    try {
      const camposActualizados = {};
      if (pacientesData.cedula !== undefined)
        camposActualizados.cedula_paciente = pacientesData.cedula;
      if (pacientesData.nombre !== undefined)
        camposActualizados.nombre_paciente = pacientesData.nombre;
      if (pacientesData.apellido !== undefined)
        camposActualizados.apellido_paciente = pacientesData.apellido;
      if (pacientesData.sexo !== undefined)
        camposActualizados.sexo_paciente = pacientesData.sexo;
      if (pacientesData.fechaNacimiento !== undefined)
        camposActualizados.fecha_nacimiento = pacientesData.fechaNacimiento;
      if (pacientesData.telefono !== undefined)
        camposActualizados.telefono_paciente = pacientesData.telefono;
      if (pacientesData.email !== undefined)
        camposActualizados.email_paciente = pacientesData.email;
      if (pacientesData.direccion !== undefined)
        camposActualizados.direccion_paciente = pacientesData.direccion;

      if (Object.keys(camposActualizados).length === 0) return null;

      const sql = "UPDATE pacientes SET ? WHERE cedula_paciente = ?";
      await query(sql, [camposActualizados, cedulaActual]);

      // Obtener el paciente actualizado se renueva la cedula o se conserva la vieja si no se actualizo
      const nuevaCedula = pacientesData.cedula || cedulaActual;
      const actualizado = await this.buscarCedula(nuevaCedula); // se vuelve a buscar para mostrar su actualizacion
      return actualizado;
    } catch (error) {
      throw new Error(`Error al actualizar paciente: ${error.message}`);
    }
  }

  static async delete(cedula) {
    try {
      const paciente = await this.buscarCedula(cedula)
      const sql = "DELETE FROM pacientes WHERE cedula_paciente = ?";
      await query(sql, [cedula]);
      return paciente
    } catch (error) {
      throw new Error(`Error al eliminar paciente: ${error.message}`);
    }
  }

  static async buscarId(idEnv) {
    try {
      const sql = "SELECT * FROM pacientes WHERE id_paciente LIKE ?";
      const rows = await query(sql, [`${idEnv}%`]);
      if (rows.length === 0) return null;
      return clear(rows[0]);
    } catch (error) {
      throw new Error(`Error al buscar paciente por ID: ${error.message}`);
    }
  } 

  /*
  static async ultimosveinte() {
    try {
      const sql =
        "SELECT * FROM pacientes ORDER BY fecha_registro DESC LIMIT 20";
      const rows = await query(sql);
      return rows.map(clear);
    } catch (error) {
      throw new Error(`Error al obtener últimos pacientes: ${error.message}`);
    }
  }
  */
}


module.exports = Pacientes;
