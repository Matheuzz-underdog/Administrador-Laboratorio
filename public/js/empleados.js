let recargarAlCerrar = false;

const editarEmpleado = async (cedula) => {
  abrirEditar();
  cedulaInputEditar.value = cedula;
};

const cedulaInputEditar = document.getElementById("cedula-put");
const formulario = document.getElementById("form-editar");

const editarPaciente = async (cedula) => {
  abrirEditar();
  cedulaInputEditar.value = cedula;
};

const cambiarEstado = async (cedula, actividad) => {
  try {
    const cambiarEstado = {};
    if (actividad == 1) {
      cambiarEstado.actividad = 0;
    } else {
      cambiarEstado.actividad = 1;
    }
    const respuesta = await fetch(
      "/empleados/actividad/" + encodeURIComponent(cedula),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambiarEstado),
      },
    );
    if (respuesta.ok) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
};

// BUSCAR AL EMPLEADO DE LOS COJONES
async function buscarEmpleado(nivel) {
  const cedula = document.getElementById("cedula-get").value;
  const botonReseteo = document.getElementById("btn-reset-buscar");

  const tbody = document.getElementById("tbody-table");
  if (!cedula) return;
  if (cedula.length < 8 || cedula.length > 10) return;
  try {
    botonReseteo.style.display = "flex";
    const respuesta = await fetch(
      "/empleados/?cedula=" + encodeURIComponent(cedula),
      {
        method: "GET",
      },
    );
    const json = await respuesta.json();
    const datos = json.data[0];

    if (respuesta.ok) {
      let dataOrdenada = `
      <tr>
        <td>${datos.cedula_empleado || "-"}</td>
        <td>${datos.nombre_empleado || "-"}</td>
        <td>${datos.apellido_empleado || "-"}</td>
        <td>${datos.cargo_empleado || "-"}</td>
        <td>${datos.telefono_empleado || "-"}</td>
        <td>${datos.email_empleado || "-"}</td>
        <td>${datos.actividad_empleado || "-"}</td>
        <td>${renderizarDatosProfesionales(datos.datos_profesionales)}</td>
      `;
      if (nivel === "editor" || nivel === "admin") {
        dataOrdenada += `
          <td class="acciones-td">
              <button class="boton-accion-tabla editar" onclick="editarEmpleado('${datos.cedula_empleado}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
              </button>
        `;
      }
      if (nivel === "admin") {
        dataOrdenada += `
          <button class="boton-accion-tabla borrar" onclick="borrarEmpleado('${datos.cedula_empleado}')">
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
        "<p>No hay ningun empleado registrado con esa cedula</p>";
    }
  } catch (err) {
    tbody.innerHTML = "<p>Ha ocurrido un error por parte del servidor</p>";
  }
}

let contador = 0;

function borrarCampo(num) {
  const campo = document.getElementById(`parametro-${num}`);
  if (campo) {
    campo.remove();
  }
}

function crearCampoDato(num) {
  contador++;

  const div = document.createElement("div");
  let n = contador;
  div.id = "parametro-" + n;
  div.className = "parametro-class";

  div.innerHTML =
    `<div id="campo-${n},${num}" class='info-profesional-todo'>` +
    "<div class='dato-individual'>" +
    `<div>` +
    `<label for="dat-tit-post${n},${num}" class="label-info">tipo de dato</label>` +
    `<input type="text" placeholder="(Especialidad, Certificacion, Titulo)" class="input-param" id="dat-tit-post${n},${num}">` +
    `</div>` +
    `<div>` +
    `<label for="dat-prof-post${n},${num}" class="label-info">contenido</label>` +
    `<input type="text" placeholder="(Bionalista, Hematología, Bacteriologia)" class="input-param" id="dat-prof-post${n},${num}">` +
    `</div>` +
    "</div>" +
    `<button type="button" class="class-btn-param" onclick="borrarCampo(${n})"> x </button>` +
    `</div>`;

  if (num === 0) {
    document.getElementById("contenedor-datos-post").appendChild(div);
  } else {
    document.getElementById("contenedor-datos-put").appendChild(div);
  }
}

function tomarDatos(num) {
  let datosProfesionales = {};
  for (let i = 1; i <= contador; i++) {
    let tituloRaw;
    let datoRaw;

    if (num === 0) {
      tituloRaw = document.getElementById(`dat-tit-post${i},0`);
      datoRaw = document.getElementById(`dat-prof-post${i},0`);
    } else {
      tituloRaw = document.getElementById(`dat-tit-post${i},1`);
      datoRaw = document.getElementById(`dat-prof-post${i},1`);
    }

    if (!datoRaw || !tituloRaw) return undefined;
    let titulo = tituloRaw.value.trim();
    let dato = datoRaw.value.trim();
    if (titulo && dato) {
      datosProfesionales[titulo] = dato;
    }
  }
  return datosProfesionales;
}

// REGISTRAR [a un elemento valioso para el laboratorio]
async function registrarEmpleado() {
  try {
    contador > 0
      ? (datosProfesionales = tomarDatos(0))
      : (datosProfesionales = null);

    const datos = {
      cedula: document.getElementById("cedula-post").value.trim(),
      nombre: document.getElementById("nombre-post").value.trim(),
      apellido: document.getElementById("apellido-post").value.trim(),
      cargo: document.getElementById("cargo-post").value.trim(),
      telefono: document.getElementById("telefono-post").value.trim(),
      email: document.getElementById("correo-post").value.trim(),
      actividad: document.getElementById("actividad-post").value.trim(),
    };
    if (datosProfesionales !== undefined) {
      datos.datos_profesionales = datosProfesionales;
    }
    const respuesta = await fetch("/empleados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await respuesta.json();
    if (respuesta.ok) {
      document.getElementById("post-formulario").reset();
      document.getElementById("contenedor-datos-post").innerHTML = "";
      contador = 0;
      window.location.reload();
    }
  } catch (err) {
    console.error("Oh no");
  }
}

/* mostrarMensaje("ostras como estamos w", true, false); */

// actualizar lets go w
async function actualizarEmpleado() {
  try {
    const cedulaActual = document.getElementById("cedula-put").value.trim();
    if (!cedulaActual) {
      // mostrarMensaje(
      //   "Debe indicar la cedula actual del paciente para actualizar.",
      //   false,
      //   false,
      // );
      return;
    }
    contador > 0
      ? (datosProfesionales = tomarDatos(1))
      : (datosProfesionales = null);

    const datos = {};
    const cedNueva = document.getElementById("cedula-op-put").value.trim();
    const nombre = document.getElementById("nombre-put").value.trim();
    const apellido = document.getElementById("apellido-put").value.trim();
    const cargo = document.getElementById("cargo-put").value.trim();
    const telefono = document.getElementById("telefono-put").value.trim();
    const email = document.getElementById("correo-put").value.trim();
    const actividad = document.getElementById("actividad-put").value.trim();
    const datosProf = datosProfesionales;

    if (cedNueva) datos.cedula = cedNueva;
    if (nombre) datos.nombre = nombre;
    if (apellido) datos.apellido = apellido;
    if (cargo) datos.cargo = cargo;
    if (telefono) datos.telefono = telefono;
    if (email) datos.email = email;
    if (actividad) datos.actividad = actividad;
    if (datosProf !== undefined) datos.datos_profesionales = datosProfesionales;

    if (Object.keys(datos).length === 0) {
      // mostrarMensaje("Complete al menos un campo para actualizar.", false, false);
      return;
    }
    const respuesta = await fetch(
      `/empleados/?cedula=` + encodeURIComponent(cedulaActual),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      },
    );
    const json = await respuesta.json();
    if (respuesta.ok) {
      window.location.reload();
      contador = 0;
    }
  } catch (err) {
    console.error("Oh no");
  }
}

function renderizarDatosProfesionales(raw) {
  if (!raw) return "<em>Sin datos profesionales</em>";
  let dp = raw;
  if (typeof dp === "string") {
    try {
      dp = JSON.parse(dp);
    } catch (e) {
      return "<em>Sin datos profesionales</em>";
    }
  }
  if (typeof dp !== "object" || Array.isArray(dp) || !Object.keys(dp).length)
    return "<em>Sin datos profesionales</em>";

  let html = '<ul class="lista-parametros">';
  for (const [clave, valor] of Object.entries(dp)) {
    html += `<li><strong>${clave}</strong> &mdash; ${valor}</li>`;
  }
  return html + "</ul>";
}

// la funcion mas sencilla
const eliminarEmpleado = async (dato) => {
  const confirmar = await confirmarVentanaAbrir("borrar", "empleado");

  if (confirmar) {
    const datafetched = await fetch(
      "/empleados/" + encodeURIComponent(dato).trim(),
      {
        method: "DELETE",
      },
    );
    const json = await datafetched.json();
    if (datafetched.ok) {
      window.location.reload();
    } else {
      console.error("Uhhh algo salio mal");
    }
  }
};
