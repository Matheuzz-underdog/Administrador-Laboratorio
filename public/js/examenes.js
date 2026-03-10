//  >:3 Utilidades generales

let recargarAlCerrar = false;

function mostrarMensaje(texto, exito, recargar) {
  recargarAlCerrar = recargar || false;
  const p = document.getElementById("texto-modal");
  p.textContent = texto;
  p.style.color = exito ? "green" : "red";
  document.getElementById("modal-fondo").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal-fondo").style.display = "none";
  if (recargarAlCerrar) location.reload();
}

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
  let html = '<ul style="margin:0; padding-left:18px;">';
  for (let i = 0; i < params.length; i++) {
    const p = params[i];
    html += "<li><strong>" + p.nombre + "</strong>";
    if (p.unidad) html += " (" + p.unidad + ")";
    if (p.referencia) html += " &mdash; Ref: " + p.referencia;
    html += "</li>";
  }
  return html + "</ul>";
}

//  Parametros dinamicos en el formulario

let contadorParam = 0;

function agregarParametro() {
  contadorParam++;
  const n = contadorParam;
  const div = document.createElement("div");
  div.id = "param-" + n;
  div.style.marginBottom = "4px";
  div.innerHTML =
    "<strong>#" +
    n +
    "</strong> " +
    '<input type="text" id="p-nombre-' +
    n +
    '" placeholder="Nombre *" style="width:140px;"> ' +
    '<input type="text" id="p-unidad-' +
    n +
    '" placeholder="Unidad (ej: mg/dL)" style="width:130px;"> ' +
    '<input type="text" id="p-ref-' +
    n +
    '" placeholder="Referencia (ej: 70-110)" style="width:130px;"> ' +
    '<button type="button" onclick="quitarParametro(' +
    n +
    ')">X</button>';
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
    const param = { nombre: nombre };
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

// ° CRUD

async function crearExamen() {
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

  try {
    const res = await fetch("/exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await res.json();
    if (res.ok) {
      mostrarMensaje("Examen registrado correctamente.", true, true);
      document.getElementById("form-crear").reset();
      document.getElementById("contenedor-parametros").innerHTML = "";
      contadorParam = 0;
    } else {
      mostrarMensaje(json.detalle || json.error, false, false);
    }
  } catch (err) {
    mostrarMensaje("Error de conexion al registrar.", false, false);
  }
}

async function buscarExamen() {
  const abreviatura = document
    .getElementById("b-abreviatura")
    .value.trim()
    .toUpperCase();
  const contenedor = document.getElementById("resultado-busqueda");

  if (!abreviatura) {
    contenedor.innerHTML = '<p style="color:red;">Ingrese una abreviatura.</p>';
    return;
  }

  try {
    const res = await fetch(
      "/exam?abreviatura=" + encodeURIComponent(abreviatura),
    );
    const json = await res.json();

    if (res.ok && json.data) {
      const lista = Array.isArray(json.data) ? json.data : [json.data];
      let filas = "";
      for (let i = 0; i < lista.length; i++) {
        const e = lista[i];
        filas +=
          "<tr>" +
          "<td>" +
          e.id_examen +
          "</td>" +
          "<td>" +
          e.nombre_examen +
          "</td>" +
          "<td>" +
          e.abreviatura_examen +
          "</td>" +
          "<td>" +
          e.area_examen +
          "</td>" +
          "<td>" +
          e.precio_examen +
          "</td>" +
          "<td>" +
          e.tipo_muestra +
          "</td>" +
          "<td>" +
          renderizarParametros(e.parametros) +
          "</td>" +
          "</tr>";
      }
      contenedor.innerHTML =
        '<table border="1" cellpadding="6" cellspacing="0">' +
        "<tr><th>ID</th><th>Nombre</th><th>Abreviatura</th><th>Area</th><th>Precio</th><th>Tipo Muestra</th><th>Parametros</th></tr>" +
        filas +
        "</table>";
    } else {
      contenedor.innerHTML =
        '<p style="color:red;">' +
        (json.detalle || json.error || "No encontrado.") +
        "</p>";
    }
  } catch (err) {
    contenedor.innerHTML =
      '<p style="color:red;">Error de conexion al buscar.</p>';
  }
}

async function eliminarExamen() {
  const abreviatura = document
    .getElementById("e-abreviatura")
    .value.trim()
    .toUpperCase();

  if (!abreviatura) {
    mostrarMensaje(
      "Ingrese la abreviatura del examen a eliminar.",
      false,
      false,
    );
    return;
  }

  if (!confirm('Seguro que desea eliminar el examen "' + abreviatura + '"?'))
    return;

  try {
    const res = await fetch("/exam/" + encodeURIComponent(abreviatura), {
      method: "DELETE",
    });
    const json = await res.json();
    if (res.ok) {
      mostrarMensaje("Examen eliminado correctamente.", true, true);
    } else {
      mostrarMensaje(json.detalle || json.error, false, false);
    }
  } catch (err) {
    mostrarMensaje("Error de conexion al eliminar.", false, false);
  }
}
