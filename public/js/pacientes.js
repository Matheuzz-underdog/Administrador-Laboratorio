// // recargarAlCerrar indica si al cerrar el modal se debe recargar la pagina
// let recargarAlCerrar = false;

// // Abre el modal con el mensaje. Si recargar=true, al cerrarlo se recarga la pagina.
// function mostrarMensaje(texto, exito, recargar) {
//   recargarAlCerrar = recargar || false;
//   const parrafo = document.getElementById("texto-modal");
//   parrafo.textContent = texto;
//   parrafo.style.color = exito ? "green" : "red";
//   document.getElementById("modal-fondo").style.display = "block";
// }

// // recarga si corresponde
// function cerrarModal() {
//   document.getElementById("modal-fondo").style.display = "none";
//   if (recargarAlCerrar) {
//     location.reload();
//   }
// }

//CREAR
const borrarPaciente = async (dato) => {
  const confirmar = await confirmarVentanaAbrir("borrar", "paciente");

  if (confirmar) {
    const datafetched = await fetch("/pacientes/" + encodeURIComponent(dato), {
      method: "DELETE",
    });
    const json = await datafetched.json();
    if (datafetched.ok) {
      window.location.reload();
    } else {
      console.error("Uhhh algo salio mal");
    }
  }
};

async function crearPaciente() {
  const datos = {
    cedula: document.getElementById("c-cedula").value.trim(),
    nombre: document.getElementById("c-nombre").value.trim(),
    apellido: document.getElementById("c-apellido").value.trim(),
    sexo: document.getElementById("c-sexo").value,
    fecha_nacimiento: document.getElementById("c-fecha").value,
    telefono: document.getElementById("c-telefono").value.trim(),
    email: document.getElementById("c-email").value.trim(),
    direccion: document.getElementById("c-direccion").value.trim(),
  };

  try {
    const respuesta = await fetch("/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      // exito=true, recargar=true -> al cerrar el modal se actualiza la tabla
      // mostrarMensaje("Paciente registrado correctamente.", true, true);
      document.getElementById("form-crear").reset();
      window.location.reload();
    }
  } catch (error) {
    // mostrarMensaje(
    //   "Error de conexion al intentar registrar el paciente.",
    //   false,
    //   false,
    // );
  }
}

const buscarPaciente = async (nivel) => {
  const cedulaInputBuscar = document.getElementById("b-cedula");
  const cedula = cedulaInputBuscar.value.trim();
  const botonReseteo = document.getElementById('btn-reset-buscar');

  const tbody = document.getElementById("tbody-table");
  if (!cedula) return window.location.reload();
  if (cedula.length < 8 || cedula.length > 10) return;
  try {
    botonReseteo.style.display = "flex";
    const respuesta = await fetch("/pacientes/buscar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });
    const json = await respuesta.json();

    if (respuesta.ok) {
      const datos = json.data;
      let dataOrdenada = `
      <tr>
        <td>${datos.cedula_paciente || "-"}</td>
        <td>${datos.nombre_paciente || "-"}</td>
        <td>${datos.apellido_paciente || "-"}</td>
        <td>${datos.sexo_paciente || "-"}</td>
        <td>${
          datos.fecha_nacimiento
            ? new Date(datos.fecha_nacimiento).toLocaleDateString("es-VE")
            : "-"
        }</td>
        <td>${datos.telefono_paciente || "-"}</td>
        <td>${datos.email_paciente || "-"}</td>
        <td>${datos.direccion_paciente || "-"}</td>
        <td>${datos.fecha_registro ? new Date(datos.fecha_registro).toLocaleString("es-VE") : "-"}</td>
      `;
      if (nivel === "editor" || nivel === "admin") {
        dataOrdenada += `
          <td class="acciones-td">
              <button class="boton-accion-tabla editar" onclick="editarPaciente('${datos.cedula_paciente}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
              </button>
        `;
      }
      if (nivel === "admin") {
        dataOrdenada += `
          <button class="boton-accion-tabla borrar" onclick="borrarPaciente('${datos.cedula_paciente}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </td>
          </tr>
        `;
      } else if (nivel === "editor") {
        dataOrdenada += "</td></tr>";
      } else {
        dataOrdenada += "</tr>";
      }
      tbody.innerHTML = dataOrdenada;
    } else {
      tbody.innerHTML =
        "<p>No hay ningun paciente registrado con esa cedula</p>";
    }
  } catch (err) {
    tbody.innerHTML = "<p>Ha ocurrido un error por parte del servidor</p>";
  }
};

//BUSCAR
async function buscarPaciene() {
  const cedula = document.getElementById("b-cedula").value.trim();
  const contenedor = document.getElementById("resultado-busqueda");

  if (!cedula) {
    contenedor.innerHTML =
      '<p style="color:red;">Ingrese una cedula para buscar.</p>';
    return;
  }

  try {
    const respuesta = await fetch("/pacientes/buscar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      const p = json.data;
      contenedor.innerHTML =
        '<table border="1" cellpadding="6" cellspacing="0">' +
        "<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Sexo</th><th>Fecha Nacimiento</th><th>Telefono</th><th>Email</th><th>Direccion</th></tr>" +
        "<tr>" +
        "<td>" +
        (p.cedula_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.nombre_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.apellido_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.sexo_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.fecha_nacimiento
          ? new Date(p.fecha_nacimiento).toLocaleDateString("es-VE")
          : "-") +
        "</td>" +
        "<td>" +
        (p.telefono_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.email_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.direccion_paciente || "-") +
        "</td>" +
        "</tr>" +
        "</table>";
    } else {
      contenedor.innerHTML =
        '<p style="color:red;">' + (json.detalle || json.error) + "</p>";
    }
  } catch (error) {
    contenedor.innerHTML =
      '<p style="color:red;">Error de conexion al buscar el paciente.</p>';
  }
}

/*
//BUSCAR POR ID
async function buscarPorId() {
  const id = document.getElementById("bid-id").value.trim();
  const contenedor = document.getElementById("resultado-busqueda-id");

  if (!id) {
    contenedor.innerHTML =
      '<p style="color:red;">Ingrese un ID para buscar.</p>';
    return;
  }

  if (id.length !== 5) {
    contenedor.innerHTML =
      '<p style="color:red;">El ID debe tener exactamente 5 caracteres.</p>';
    return;
  }

  try {
    const respuesta = await fetch("/pacientes/" + encodeURIComponent(id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      const p = json.data;
      contenedor.innerHTML =
        '<table border="1" cellpadding="6" cellspacing="0">' +
        "<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Sexo</th><th>Fecha Nacimiento</th><th>Telefono</th><th>Email</th><th>Direccion</th></tr>" +
        "<tr>" +
        "<td>" +
        (p.cedula_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.nombre_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.apellido_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.sexo_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.fecha_nacimiento
          ? new Date(p.fecha_nacimiento).toLocaleDateString("es-VE")
          : "-") +
        "</td>" +
        "<td>" +
        (p.telefono_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.email_paciente || "-") +
        "</td>" +
        "<td>" +
        (p.direccion_paciente || "-") +
        "</td>" +
        "</tr>" +
        "</table>";
    } else {
      contenedor.innerHTML =
        '<p style="color:red;">' + (json.detalle || json.error) + "</p>";
    }
  } catch (error) {
    contenedor.innerHTML =
      '<p style="color:red;">Error de conexion al buscar el paciente.</p>';
  }
}
*/

//ACTUALIZAR
const cedulaInputEditar = document.getElementById("a-cedula-actual");
const formulario = document.getElementById("form-editar");

const editarPaciente = async (cedula) => {
  abrirEditar();
  cedulaInputEditar.value = cedula;
};

async function actualizarPaciente() {
  const cedulaActual = document.getElementById("a-cedula-actual").value.trim();

  if (!cedulaActual) {
    // mostrarMensaje(
    //   "Debe indicar la cedula actual del paciente para actualizar.",
    //   false,
    //   false,
    // );
    return;
  }

  const datos = {};
  const cedNueva = document.getElementById("a-cedula-nueva").value.trim();
  const nombre = document.getElementById("a-nombre").value.trim();
  const apellido = document.getElementById("a-apellido").value.trim();
  const sexo = document.getElementById("a-sexo").value;
  const fecha = document.getElementById("a-fecha").value;
  const telefono = document.getElementById("a-telefono").value.trim();
  const email = document.getElementById("a-email").value.trim();
  const direccion = document.getElementById("a-direccion").value.trim();

  if (cedNueva) datos.cedula = cedNueva;
  if (nombre) datos.nombre = nombre;
  if (apellido) datos.apellido = apellido;
  if (sexo) datos.sexo = sexo;
  if (fecha) datos.fecha_nacimiento = fecha;
  if (telefono) datos.telefono = telefono;
  if (email) datos.email = email;
  if (direccion) datos.direccion = direccion;

  if (Object.keys(datos).length === 0) {
    // mostrarMensaje("Complete al menos un campo para actualizar.", false, false);
    return;
  }

  try {
    const respuesta = await fetch(
      "/pacientes/" + encodeURIComponent(cedulaActual),
      {
        //fetch es goodd
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      },
    );

    const json = await respuesta.json();

    if (respuesta.ok) {
      formulario.reset();
      window.location.reload();
      // mostrarMensaje("Paciente actualizado correctamente.", true, true);
    } else {
      // mostrarMensaje(
      //   "Error al actualizar: " + (json.detalle || json.error),
      //   false,
      //   false,
      // );
    }
  } catch (error) {
    // mostrarMensaje(
    //   "Error de conexion al intentar actualizar el paciente.",
    //   false,
    //   false,
    // );
  }
}

//ELIMINAR
// async function eliminarPaciente() {
//   const cedula = document.getElementById("e-cedula").value.trim();

//   if (!cedula) {
//     // mostrarMensaje(
//     //   "Ingrese la cedula del paciente que desea eliminar.",
//     //   false,
//     //   false,
//     // );
//     return;
//   }

//   const confirmar = confirm(
//     "Esta seguro de que desea eliminar al paciente con cedula: " + cedula + "?",
//   );
//   if (!confirmar) return;

//   try {
//     const respuesta = await fetch("/pacientes/" + encodeURIComponent(cedula), {
//       method: "DELETE",
//     });

//     const json = await respuesta.json();

//     if (respuesta.ok) {
//       // mostrarMensaje("Paciente eliminado correctamente.", true, true);
//     } else {
//       // mostrarMensaje(
//       //   "Error al eliminar: " + (json.detalle || json.error),
//       //   false,
//       //   false,
//       // );
//     }
//   } catch (error) {
//     // mostrarMensaje(
//     //   "Error de conexion al intentar eliminar el paciente.",
//     //   false,
//     //   false,
//     // );
//   }
// }
