let recargarAlCerrar = false;

// Utilidades de parametros

function parsearParametros(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p : [];
    } catch (e) {
      return [];
    }
  }
  return [];
}

function renderizarParametros(raw) {
  const params = parsearParametros(raw);
  if (!params.length) return "<em>Sin parametros</em>";
  let html = '<ul class="lista-parametros">';
  for (let i = 0; i < params.length; i++) {
    const p = params[i];
    html += "<li><strong>" + p.nombre + "</strong>";
    if (p.unidad) html += " (" + p.unidad + ")";
    if (p.referencia) html += " &mdash; Ref: " + p.referencia;
    html += "</li>";
  }
  return html + "</ul>";
}

// Parametros dinamicos en el formulario

let contadorParam = 0;

function agregarParametro() {
  contadorParam++;
  const n = contadorParam;
  const div = document.createElement("div");
  div.id = "param-" + n;
  div.className = "parametro-class";
  div.innerHTML =
    `<div id="campo-${n}" class="info-profesional-todo">` +
    "<div class='dato-individual'>" +
    "<div>" +
    `<label for="p-nombre-${n}" class="label-info">Nombre</label>` +
    `<input type="text" id="p-nombre-${n}" placeholder="Nombre *" class="input-param">` +
    "</div>" +
    "<div>" +
    `<label for="p-unidad-${n}" class="label-info">Unidad</label>` +
    `<input type="text" id="p-unidad-${n}" placeholder="ej: mg/dL" class="input-param">` +
    "</div>" +
    "<div>" +
    `<label for="p-ref-${n}" class="label-info">Referencia</label>` +
    `<input type="text" id="p-ref-${n}" placeholder="ej: 70-110" class="input-param">` +
    "</div>" +
    "</div>" +
    `<button type="button" class="class-btn-param" onclick="quitarParametro(${n})"> x </button>` +
    "</div>";
  document.getElementById("contenedor-parametros").appendChild(div);
  document.getElementById("p-nombre-" + n).focus();
}

function quitarParametro(n) {
  const fila = document.getElementById("param-" + n);
  if (fila) fila.remove();
}

function obtenerParametros() {
  const filas = document
    .getElementById("contenedor-parametros")
    .querySelectorAll('[id^="param-"]');
  const lista = [];
  for (let i = 0; i < filas.length; i++) {
    const n = filas[i].id.replace("param-", "");
    const nombre = document.getElementById("p-nombre-" + n).value.trim();
    if (!nombre) continue;
    const param = { nombre };
    const unidad = document.getElementById("p-unidad-" + n).value.trim();
    const ref = document.getElementById("p-ref-" + n).value.trim();
    if (unidad) param.unidad = unidad;
    if (ref) param.referencia = ref;
    lista.push(param);
  }
  return lista;
}

document
  .getElementById("btn-agregar-param")
  .addEventListener("click", agregarParametro);

document.addEventListener("keydown", (ev) => {
  if (ev.key !== "+") return;
  const tag = document.activeElement.tagName;
  const dentroFieldset = document
    .querySelector("fieldset")
    .contains(document.activeElement);
  if (tag !== "INPUT" || dentroFieldset) {
    ev.preventDefault();
    agregarParametro();
  }
});

// BUSCAR EXAMEN
async function buscarExamen() {
  const abreviatura = document
    .getElementById("b-abreviatura")
    .value.trim()
    .toUpperCase();
  const botonReseteo = document.getElementById("btn-reset-buscar");
  const tbody = document.getElementById("tbody-table");

  if (!abreviatura) return;

  try {
    botonReseteo.style.display = "flex";
    const respuesta = await fetch(
      "/exam?abreviatura=" + encodeURIComponent(abreviatura),
    );
    const json = await respuesta.json();

    if (respuesta.ok && json.data) {
      const lista = Array.isArray(json.data) ? json.data : [json.data];
      let dataOrdenada = "";
      for (let i = 0; i < lista.length; i++) {
        const e = lista[i];
        dataOrdenada += `
          <tr>
            <td>${e.id_examen || "-"}</td>
            <td>${e.nombre_examen || "-"}</td>
            <td>${e.abreviatura_examen || "-"}</td>
            <td>${e.area_examen || "-"}</td>
            <td>${e.precio_examen || "-"}</td>
            <td>${e.tipo_muestra || "-"}</td>
            <td>${renderizarParametros(e.parametros)}</td>
            <td>
              <button class="boton-accion-tabla borrar" onclick="eliminarExamen('${e.abreviatura_examen}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
            </td>
          </tr>
        `;
      }
      tbody.innerHTML = dataOrdenada;
    } else {
      tbody.innerHTML =
        "<tr><td colspan='7'>No hay ningun examen registrado con esa abreviatura</td></tr>";
    }
  } catch (err) {
    tbody.innerHTML =
      "<tr><td colspan='7'>Ha ocurrido un error por parte del servidor</td></tr>";
  }
}

// REGISTRAR EXAMEN
async function crearExamen() {
  try {
    const datos = {
      nombre: document.getElementById("c-nombre").value.trim(),
      abreviatura: document
        .getElementById("c-abreviatura")
        .value.trim()
        .toUpperCase(),
      area: document.getElementById("c-area").value.trim(),
      precio: parseFloat(document.getElementById("c-precio").value),
      tipoMuestra: document.getElementById("c-muestra").value.trim(),
      parametros: obtenerParametros(),
    };

    const respuesta = await fetch("/exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await respuesta.json();
    if (respuesta.ok) {
      document.getElementById("form-crear").reset();
      document.getElementById("contenedor-parametros").innerHTML = "";
      contadorParam = 0;
      window.location.reload();
    }
  } catch (err) {
    console.error("Oh no");
  }
}

// ELIMINAR EXAMEN
const eliminarExamen = async (dato) => {
  const confirmar = await confirmarVentanaAbrir("borrar", "examen");

  if (confirmar) {
    const datafetched = await fetch(
      "/exam/" + encodeURIComponent(dato).trim(),
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
