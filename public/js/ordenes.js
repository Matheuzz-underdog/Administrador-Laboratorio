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

//Ventanas Extras
//sis
const confirmacionWindow = document.getElementById("confirmacion-borrar");

// a;sdlas
const obtenerAbreviaturas = async () => {
  const fetched = await fetch("/exam/ex-abreviaturas");
  const fetchedJSON = await fetched.json();
  return fetchedJSON.data;
};

// EEEEEEEEEEE E alo sans
const mostrarDetalle = async (id) => {
  try {
    containerDetalle.style.display = "block";

    // Obtener info de detalle Orden
    const respuestaDetalle = await fetch("/ordenes?buscar_detalle=" + id);
    const dataEnJson = await respuestaDetalle.json();

    const datosUsablesDetalle = dataEnJson.data;

    if (respuestaDetalle.ok && datosUsablesDetalle) {
      let formateo = "";
      for (let i = 0; i < Object.keys(datosUsablesDetalle).length; i++) {
        const datosFila = datosUsablesDetalle[i];
        // Obtener Info de examen
        let respuestaExamen = await fetch(
          `/exam?abreviatura=${datosFila.abreviatura_examen}`,
        );
        let examenEnJson = await respuestaExamen.json();
        let datosExamen = examenEnJson.data[0];

        formateo +=
          "<tr>" +
          "<td>" +
          datosFila.id_detalle +
          "</td>" +
          "<td>" +
          datosFila.id_orden +
          "</td>" +
          "<td>" +
          datosExamen.id_examen +
          "</td>" +
          "<td>" +
          datosExamen.nombre_examen +
          "</td>" +
          "<td>" +
          datosExamen.area_examen +
          "</td>" +
          "<td>" +
          datosExamen.tipo_muestra +
          "</td>" +
          "<td>" +
          datosFila.precio_historico +
          "</td>";

        const checkearResultado = await fetch(
          "/ordenes/res?buscar_detalle=" + datosFila.id_detalle,
        );
        const resultadoJSON = await checkearResultado.json();
        const x = resultadoJSON.data;

        if (x.length > 0) {
          formateo +=
            "<td>" +
            `<button onclick="verResultado(${datosFila.id_detalle})">VER</button>` +
            "</td>" +
            "</tr>";
        } else {
          formateo += "<td>" + `Sin resultados` + "</td>" + "</tr>";
        }
      }
      tbodyDetalle.innerHTML = formateo;
    } else {
      tbodyDetalle.innerHTML =
        "<tr>" +
        '<td colspan="8" style="text-align: center;">NO HAY DETALLES</td>' +
        "</tr>";
    }
  } catch {
    tbodyDetalle.innerHTML =
      "<tr>" +
      '<td colspan="8" style="text-align: center;">OCURRIO UN ERROR AL MOSTRAR LOS DETALLES</td>' +
      "</tr>";
  }
};
const cerrarDetalle = () => {
  containerDetalle.style.display = "none";
  tbodyDetalle.innerHTML = "";
};

const verResultado = async (id) => {
  containerResultados.style.display = "block";

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

  if (!cedula) return console.error("No value");

  try {
    const response = await fetch(
      "/ordenes?buscar_orden=" + encodeURIComponent(cedula),
    );
    const dataJSON = await response.json();
    const dataLimpia = dataJSON.data;
    let tbody = "";

    if (dataLimpia && dataLimpia.length > 0) {
      dataLimpia.forEach((orden) => {
        const fechaLimpia = new Date(orden.fecha_orden).toString();
        tbody +=
          "<tr>" +
          `<td>${orden.id_orden}</td>` +
          `<td>${orden.cedula_paciente}</td>` +
          `<td>${orden.cedula_empleado}</td>` +
          `<td>${orden.monto_total}</td>` +
          `<td>${orden.estado_pago}<button type="button" onclick="cambiarEstado('${orden.id_orden}', '${orden.estado_pago}', 'cambiar')">Cambiar</button></td>` +
          `<td>${fechaLimpia}</td>` +
          `<td><button onclick="mostrarDetalle(${orden.id_orden})">VER</button></td>` +
          `<td><button onclick="eliminarOrden(${orden.id_orden}, 'eliminar')">BORRAR</button></td>` +
          "</tr>";
      });
    } else {
      tbody +=
        "<tr>" +
        '<td colspan="7" style="text-align: center;">NO SE ENCONTRO NINGUNA ORDEN</td>' +
        "</tr>";
    }
    resultadoBusqueda.style.display = "block";
    tbodyResultado.innerHTML = tbody;
  } catch {
    tbodyResultado.innerHTML =
      "<tr>" +
      '<td colspan="8" style="text-align: center;">OCURRIO UN ERROR AL INTENTAR MOSTRAR LAS ORDENES</td>' +
      "</tr>";
  }
};

const eliminarOrden = async (id, valor) => {
  const confirmar = await confirmarMensaje(valor);

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

const confirmarMensaje = (valor) => {
  confirmacionWindow.style.display = "block";
  if (valor === "eliminar") {
    document.getElementById("valor-texto-confirmar").textContent =
      "¿Seguro que desea eliminar esa orden?";
    document.getElementById("confirmacion-borrar").style.background =
      "rgba(255, 0, 0, 0.5)";
  }
  if (valor === "cambiar") {
    document.getElementById("valor-texto-confirmar").textContent =
      "¿Quiere cambiar el estado de la orden?";
    document.getElementById("confirmacion-borrar").style.background =
      "rgba(0, 149, 255, 0.5)";
  }
  return new Promise((resolve) => {
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");

    btnSi.onclick = () => {
      confirmacionWindow.style.display = "none";
      resolve(true);
    };
    btnNo.onclick = () => {
      confirmacionWindow.style.display = "none";
      resolve(false);
    };
  });
};

const cerrarConfirmacion = () => {
  confirmacionWindow.style.display = "none";
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

const cambiarEstado = async (idOrden, estado, valor) => {
  const confirmar = await confirmarMensaje(valor);
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
};

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
