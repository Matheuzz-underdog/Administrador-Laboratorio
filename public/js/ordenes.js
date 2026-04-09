// Detalles
const containerDetalle = document.getElementById("container-detalle");
const windowDetalle = document.getElementById("detalle-window");
const tbodyDetalle = document.getElementById("tbody-detalle");

// Resultados
const containerResultados = document.getElementById("container-resultado");
const resultadosFinal = document.getElementById("resultados-final-container");

// Busqueda
const resultadoBusqueda = document.getElementById("div-resultados-busqueda");
const labelBusqueda = document.getElementsByClassName("label-busqueda");
const tbodyResultado = document.getElementById("tbody-busqueda-orden");

//detalles detalles ddetalles
const detallesCont = document.getElementById("detalle-container");

// a;sdlas
const obtenerAbreviaturas = async () => {
  const fetched = await fetch("/exam/ex-abreviaturas");
  const fetchedJSON = await fetched.json();
  return fetchedJSON.data;
};

// EEEEEEEEEEE E alo sans
const mostrarDetalle = async (id) => {
  try {
    containerDetalle.style.display = "flex";

    const respuestaDetalle = await fetch("/ordenes?buscar_detalle=" + id);
    const dataEnJson = await respuestaDetalle.json();
    const datosUsablesDetalle = dataEnJson.data;

    if (respuestaDetalle.ok && datosUsablesDetalle) {
      let formateo = "";
      for (let i = 0; i < Object.keys(datosUsablesDetalle).length; i++) {
        const datosFila = datosUsablesDetalle[i];

        let respuestaExamen = await fetch(
          `/exam?abreviatura=${datosFila.abreviatura_examen}`,
        );
        let examenEnJson = await respuestaExamen.json();
        let datosExamen = examenEnJson.data[0];

        formateo +=
          `<tr>` +
          `<td>${datosFila.id_detalle}</td>` +
          `<td>${datosFila.id_orden}</td>` +
          `<td>${datosExamen.id_examen}</td>` +
          `<td>${datosExamen.nombre_examen}</td>` +
          `<td>${datosExamen.area_examen}</td>` +
          `<td>${datosExamen.tipo_muestra}</td>` +
          `<td>${datosFila.precio_historico}</td>`;

        const checkearResultado = await fetch(
          "/ordenes/res?buscar_detalle=" + datosFila.id_detalle,
        );
        const resultadoJSON = await checkearResultado.json();
        const x = resultadoJSON.data;

        if (x.length > 0) {
          formateo +=
            `<td class="acciones-td">` +
            `<button class="boton-accion-tabla editar" onclick="verResultado(${datosFila.id_detalle})">` +
            `<svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
            `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>` +
            `<circle cx="12" cy="12" r="3"/>` +
            `</svg>` +
            `</button></td>` +
            `</tr>`;
        } else {
          formateo += `<td><span class="sin-resultado" onclick="abrirFormResultado(${datosFila.id_detalle})">Sin resultados</span></td></tr>`;
        }
      }
      tbodyDetalle.innerHTML = formateo;
    } else {
      tbodyDetalle.innerHTML = `<tr><td colspan="8" style="text-align: center;">NO HAY DETALLES</td></tr>`;
    }
  } catch {
    tbodyDetalle.innerHTML = `<tr><td colspan="8" style="text-align: center;">OCURRIO UN ERROR AL MOSTRAR LOS DETALLES</td></tr>`;
  }
};
const cerrarDetalle = () => {
  containerDetalle.style.display = "none";
  tbodyDetalle.innerHTML = "";
};

const verResultado = async (id) => {
  containerResultados.style.display = "flex";

  const checkearResultado = await fetch("/ordenes/res?buscar_detalle=" + id);
  const resultadoJSON = await checkearResultado.json();
  const x = resultadoJSON.data[0];

  const buscarEmpleado = await fetch("/empleados?cedula=" + x.cedula_empleado);
  const empleadoJSON = await buscarEmpleado.json();
  const empelado = empleadoJSON.data[0];

  let div = "";
  div +=
    "<div class='div-titulo-resultado'>" +
    "<h4 class='titulo-resultado'>" +
    `Mostrando resultado [${x.id_resultado}]` +
    "</h4>" +
    "<p class='subtitulo-resultado'>" +
    `Asignada al detalle [${x.id_detalle}]` +
    "</p>" +
    "</div>" +
    "<div class='info-empleado'>" +
    `<p class='info-nombre-empleado'>Encargado: ${empelado.nombre_empleado} ${empelado.apellido_empleado}</p>` +
    `<p class='info-cargo-empleado'>${empelado.cargo_empleado}</p>` +
    `<p class='info-contacto-empleado'>${empelado.telefono_empleado} | ${empelado.email_empleado}</p>` +
    "</div>";
  const valores = JSON.parse(x.valores_resultados);

  valores.forEach((valor) => {
    div +=
      "<div class='info-valor'>" +
      `<div class='info-valor-individual'><p class='info-valor-nombre'>Nombre del examen: ${valor.nombre}</p></div>` +
      `<div class='info-valor-individual'><p class='info-valor-numero'>Valor del Resultado: ${valor.valor}</p></div>`;
    if (valor.referencia.general) {
      div +=
        `<div class='info-valor-individual'><p class='info-valor-referencia'>Referencia general: ${valor.referencia.general[0]} - ${valor.referencia.general[1]}</p></div>` +
        "</div>";
    } else {
      div +=
        `<div class='info-valor-individual'><p class='info-valor-referencia'>Referencia por sexo: M(${valor.referencia.M[0]} - ${valor.referencia.M[1]}) | F(${valor.referencia.F[0]} - ${valor.referencia.F[1]})</p></div>` +
        "</div>";
    }
  });
  resultadosFinal.innerHTML = div;
};

const cerrarResultado = () => {
  containerResultados.style.display = "none";
};

const buscarOrden = async () => {
  const cedula = document.getElementById("valor-busqueda").value;
  const botonReseteo = document.getElementById("btn-reset-buscar");
  const tbody = document.getElementById("table-ordenes");

  if (!cedula) return;

  try {
    botonReseteo.style.display = "flex";
    const response = await fetch(
      "/ordenes?buscar_orden=" + encodeURIComponent(cedula),
    );
    const dataJSON = await response.json();
    const dataLimpia = dataJSON.data;

    if (dataLimpia && dataLimpia.length > 0) {
      let filas = "";
      dataLimpia.forEach((orden) => {
        filas +=
          `<tr>` +
          `<td>${orden.id_orden}</td>` +
          `<td>${orden.cedula_paciente}</td>` +
          `<td>${orden.cedula_empleado}</td>` +
          `<td>${orden.monto_total}</td>` +
          `<td class="actividad-empleado-td">${orden.estado_pago}` +
          `<button class="boton-cambiar" onclick="cambiarEstado('${orden.id_orden}', '${orden.estado_pago}')">` +
          `<svg xmlns="http://www.w3.org/2000/svg" class="boton-cambiar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
          `<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>` +
          `<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>` +
          `</svg></button></td>` +
          `<td>${new Date(orden.fecha_orden).toLocaleString("es-VE")}</td>` +
          `<td><button class="boton-accion-tabla editar" onclick="mostrarDetalle(${orden.id_orden})">` +
          `<svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
          `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>` +
          `</svg></button></td>` +
          `<td class="acciones-td"><button class="boton-accion-tabla borrar" onclick="eliminarOrden(${orden.id_orden})">` +
          `<svg xmlns="http://www.w3.org/2000/svg" class="acciones-btn-svg editar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
          `<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>` +
          `</svg></button></td>` +
          `</tr>`;
      });
      tbody.innerHTML = filas;
    } else {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center;">NO SE ENCONTRO NINGUNA ORDEN</td></tr>`;
    }
  } catch {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center;">OCURRIO UN ERROR AL INTENTAR MOSTRAR LAS ORDENES</td></tr>`;
  }
};

const eliminarOrden = async (id) => {
  const confirmar = await confirmarVentanaAbrir("borrar", "Orden");

  if (confirmar) {
    const datafetched = await fetch("/ordenes/" + encodeURIComponent(id), {
      method: "DELETE",
    });
    const json = await datafetched.json();
    if (datafetched.ok) {
      console.log(json);
      window.location.reload();
    } else {
      console.error("Uhhh algo salio mal");
    }
  }
};

// Agregar nueva orden
const nuevoDetalleBtn = document.getElementById("btn-nuevo-detalle");

let count = 0;
let abreviaturasExamenesArray;

nuevoDetalleBtn.addEventListener("click", async () => {
  if (count === 0) {
    abreviaturasExamenesArray = await obtenerAbreviaturas();
  }
  count++;
  const div = document.createElement("div");
  div.id = "div-detalle-invdividual";

  let optionsSelect = "";

  for (let i = 0; i < abreviaturasExamenesArray.length; i++) {
    optionsSelect += `<option>${abreviaturasExamenesArray[i]}</option>`;
  }
  div.innerHTML =
    `<label for='detalle-valor-${count}' id='detalle-valor-${count}'>Seleccione examen` +
    `<select name='detalle-select-${count}' id='select-${count}' class='select-examenes'>${optionsSelect}</select>` +
    `<button type='button' onclick='quitarDetalle(${count})'>X</button>` +
    `</label>`;
  detallesCont.appendChild(div);
});

const quitarDetalle = (id) => {
  const labeldetalle = document.getElementById(`detalle-valor-${id}`);
  if (labeldetalle) labeldetalle.remove();
};

const crearOrden = async () => {
  const cedulaPaciente = document.getElementById("cedula-paciente").value;
  const cedulaEmpleado = document.getElementById("cedula-empleado").value;
  if (!cedulaPaciente || !cedulaEmpleado) {
    return (null, console.error("Oh.. No data"));
  }
  const detallesFormateados = await organizarDetalles();
  if (!detallesFormateados) {
    return console.error("FUck");
  }
  const infoFinal = {
    cedula_paciente: cedulaPaciente,
    cedula_empleado: cedulaEmpleado,
    detalles_orden: detallesFormateados,
  };

  try {
    const response = await fetch("/ordenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoFinal),
    });

    if (response.ok) {
      document.getElementById("formulario-crear-orden").reset();
      window.location.reload();
    }
  } catch {
    console.error("Algo salio mal en el servidor");
  }
};

const organizarDetalles = () => {
  const todosLosDetalles = document.querySelectorAll('[id^="select-"]');

  if (todosLosDetalles.length === 0) return null;
  let formateo = [];

  todosLosDetalles.forEach((detalle) => {
    formateo.push(detalle.value);
  });
  return formateo;
};

async function cambiarEstado(idOrden, estado) {
  const confirmar = await confirmarVentanaAbrir("orden", "Orden");
  if (confirmar) {
    const estadoNuevo = await determinarEstado(estado);
    const fetchedCambio = await fetch(`/ordenes/facturar/${idOrden}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estadoNuevo),
    });
    if (fetchedCambio.ok) {
      window.location.reload();
    } else {
      console.error("Uhhh algo salio mal");
    }
  }
}

const determinarEstado = (estado) => {
  if (estado === "Pendiente") {
    return {
      estado: "Pagado",
    };
  } else {
    return {
      estado: "Pendiente",
    };
  }
};

// FORMULARIO DE CREAR RESULTADO
const abrirFormResultado = (idDetalle) => {
  const existente = document.getElementById("form-resultado-container");
  if (existente) existente.remove();

  const div = document.createElement("div");
  div.id = "form-resultado-container";
  div.className = "form-crear-dentro";
  div.innerHTML =
    `<div class="top-info-usuario">` +
    `<h3>Registrar resultado — Detalle #${idDetalle}</h3>` +
    `<button id="cerrar-info-btn" onclick="cerrarFormResultado()">` +
    `<svg xmlns="http://www.w3.org/2000/svg" class="cerrar-info-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>` +
    `</svg></button>` +
    `</div>` +
    `<div class="field">` +
    `<label for="res-cedula-empleado">Cédula del empleado</label>` +
    `<input type="text" id="res-cedula-empleado" placeholder="V-12345678" pattern="^[VE]-[0-8]+$">` +
    `</div>` +
    `<div class="field">` +
    `<label for="res-observaciones">Observaciones</label>` +
    `<input type="text" id="res-observaciones" placeholder="Opcional...">` +
    `</div>` +
    `<div class="field">` +
    `<label>Valores <button type="button" class="area-admin-editor-btn" onclick="agregarValorResultado()">+</button></label>` +
    `<div id="contenedor-valores-resultado"></div>` +
    `</div>` +
    `<div class="btn-class">` +
    `<button type="button" class="btn-crear" onclick="enviarResultado(${idDetalle})">Registrar</button>` +
    `</div>`;

  document.getElementById("detalle-window").appendChild(div);
};

const cerrarFormResultado = () => {
  const form = document.getElementById("form-resultado-container");
  if (form) form.remove();
  contadorValores = 0;
};

// VALORES DINAMICOS DEL RESULTADO
let contadorValores = 0;

const agregarValorResultado = () => {
  contadorValores++;
  const n = contadorValores;
  const div = document.createElement("div");
  div.id = `valor-resultado-${n}`;
  div.className = "parametro-class";
  div.innerHTML =
    `<div class="info-profesional-todo">` +
    `<div class="dato-individual">` +
    `<div>` +
    `<label class="label-info">Nombre</label>` +
    `<input type="text" id="vr-nombre-${n}" placeholder="Glucosa" class="input-param">` +
    `</div>` +
    `<div>` +
    `<label class="label-info">Valor</label>` +
    `<input type="text" id="vr-valor-${n}" placeholder="150mg/dL" class="input-param">` +
    `</div>` +
    `<div>` +
    `<button type="button" class="class-btn-param" onclick="quitarValorResultado(${n})"> x </button>` +
    `</div>`;
  document.getElementById("contenedor-valores-resultado").appendChild(div);
};

const quitarValorResultado = (n) => {
  const campo = document.getElementById(`valor-resultado-${n}`);
  if (campo) campo.remove();
};

const obtenerValoresResultado = () => {
  const filas = document
    .getElementById("contenedor-valores-resultado")
    .querySelectorAll('[id^="valor-resultado-"]');

  const lista = [];
  for (let i = 0; i < filas.length; i++) {
    const n = filas[i].id.replace("valor-resultado-", "");
    const nombre = document.getElementById(`vr-nombre-${n}`).value.trim();
    const valor = document.getElementById(`vr-valor-${n}`).value.trim();

    if (!nombre || !valor) continue;

    const entrada = { nombre, valor };
    lista.push(entrada);
  }
  return lista;
};

// CREAR RESULTADO
const enviarResultado = async (idDetalle) => {
  try {
    const cedulaEmpleado = document
      .getElementById("res-cedula-empleado")
      .value.trim();
    const observaciones = document
      .getElementById("res-observaciones")
      .value.trim();
    const valores = obtenerValoresResultado();

    if (!cedulaEmpleado || valores.length === 0) return;

    const body = {
      id_detalle: idDetalle,
      cedula_empleado: cedulaEmpleado,
      valores_resultados: valores,
      observaciones: observaciones || null,
    };

    const respuesta = await fetch("/ordenes/res", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (respuesta.ok) {
      cerrarFormResultado();
      mostrarDetalle(idDetalle);
    } else {
      console.error("Oh no");
    }
  } catch {
    console.error("Oh no");
  }
};
