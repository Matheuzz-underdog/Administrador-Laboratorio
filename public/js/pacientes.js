// recargarAlCerrar indica si al cerrar el modal se debe recargar la pagina
let recargarAlCerrar = false;

// Abre el modal con el mensaje. Si recargar=true, al cerrarlo se recarga la pagina.
function mostrarMensaje(texto, exito, recargar) {
  recargarAlCerrar = recargar || false;
  const parrafo = document.getElementById("texto-modal");
  parrafo.textContent = texto;
  parrafo.style.color = exito ? "green" : "red";
  document.getElementById("modal-fondo").style.display = "block";
}

// recarga si corresponde
function cerrarModal() {
  document.getElementById("modal-fondo").style.display = "none";
  if (recargarAlCerrar) {
    location.reload();
  }
}

//CREAR
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
      mostrarMensaje("Paciente registrado correctamente.", true, true);
      document.getElementById("form-crear").reset();
    } else {
      mostrarMensaje(
        "Error al registrar: " + (json.detalle || json.error),
        false,
        false,
      );
    }
  } catch (error) {
    mostrarMensaje(
      "Error de conexion al intentar registrar el paciente.",
      false,
      false,
    );
  }
}

//BUSCAR
async function buscarPaciente() {
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

//ACTUALIZAR
async function actualizarPaciente() {
  const cedulaActual = document.getElementById("a-cedula-actual").value.trim();

  if (!cedulaActual) {
    mostrarMensaje(
      "Debe indicar la cedula actual del paciente para actualizar.",
      false,
      false,
    );
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
    mostrarMensaje("Complete al menos un campo para actualizar.", false, false);
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
      mostrarMensaje("Paciente actualizado correctamente.", true, true);
    } else {
      mostrarMensaje(
        "Error al actualizar: " + (json.detalle || json.error),
        false,
        false,
      );
    }
  } catch (error) {
    mostrarMensaje(
      "Error de conexion al intentar actualizar el paciente.",
      false,
      false,
    );
  }
}

//ELIMINAR
async function eliminarPaciente() {
  const cedula = document.getElementById("e-cedula").value.trim();

  if (!cedula) {
    mostrarMensaje(
      "Ingrese la cedula del paciente que desea eliminar.",
      false,
      false,
    );
    return;
  }

  const confirmar = confirm(
    "Esta seguro de que desea eliminar al paciente con cedula: " + cedula + "?",
  );
  if (!confirmar) return;

  try {
    const respuesta = await fetch("/pacientes/" + encodeURIComponent(cedula), {
      method: "DELETE",
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje("Paciente eliminado correctamente.", true, true);
    } else {
      mostrarMensaje(
        "Error al eliminar: " + (json.detalle || json.error),
        false,
        false,
      );
    }
  } catch (error) {
    mostrarMensaje(
      "Error de conexion al intentar eliminar el paciente.",
      false,
      false,
    );
  }
}
