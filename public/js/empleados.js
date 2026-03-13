
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

// BUSCAR AL EMPLEADO DE LOS COJONES
async function buscarEmpleado() {
    const resultado = document.getElementById("resultado-get");
    const cedula = document.getElementById("cedula-get").value;
    
    if (!cedula) {
        resultado.innerHTML =
            '<p style="color:#f00;">Ingrese una cedula para buscar.</p>';
    return;
    }

    try {
        const busqueda = await fetch(`/empleados/?cedula=${cedula}`)
        const datos = await busqueda.json()

        if (busqueda.ok) {
            const e = datos.data[0]
            resultado.innerHTML =
                '<table border="1" cellpadding="6" cellspacing="0">' +
                "<tr><th>Cedula</th><th>Nombre</th><th>Apellido</th><th>Cargo</th><th>Telefono</th><th>Email</th><th>Actividad</th><th>Datos Profesionales</th></tr>" +
                "<tr>" +
                "<td>" +
                (e.cedula_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.nombre_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.apellido_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.cargo_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.telefono_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.email_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.actividada_empleado || "-") +
                "</td>" +
                "<td>" +
                (e.datos_profesionales || "-") +
                "</td>" +
                "</tr>" +
                "</table>";
        } else {
            resultado.innerHTML =
                '<p style="color:red;">' + (datos.detalle || datos.error) + "</p>";
        }
    } catch(err) {
        console.log(`ERROR: ` + err)
    }
}

let contador = 0;

function borrarCampo(id,num) {
    const campo = document.getElementById(`campo-${id},${num}`)
    if (campo) {
        campo.remove()
    }
}

function crearCampoDato(num) {
    contador++;

    const div = document.createElement("div");
    let n = contador
    div.id = "parametro-" + n;
    div.style.marginBottom = "4px";
    div.innerHTML = `<div id="campo-${n},${num}">` +
    `<div>` +
    `<label for="dat-tit-post${n},${num}">Tipo de Información</label>` +
    `<input type="text" placeholder="(Especialidad, Certificacion, Titulo)" id="dat-tit-post${n},${num}">` +
    `</div>` +
    `<div>` +
    `<label for="dat-prof-post${n},${num}">Información</label>` +
    `<input type="text" placeholder="(Bionalista, Hematología, Bacteriologia)" id="dat-prof-post${n},${num}">` +
    `</div>` +
    `<button type="button" onclick="borrarCampo(${n},${num})"> x </button>` +
    `</div>` 
    
    if (num === 0) {
        document.getElementById("contenedor-datos-post").appendChild(div);
    } else {
        document.getElementById("contenedor-datos-put").appendChild(div);
    }
    
}

function tomarDatos(num) {
    let datosProfesionales = {};
    for (let i = 1; i <= contador; i++) {
        let tituloRaw 
        let datoRaw

        if (num === 0) {
            tituloRaw = document.getElementById(`dat-tit-post${i},0`);
            datoRaw = document.getElementById(`dat-prof-post${i},0`);
        } else {
            tituloRaw = document.getElementById(`dat-tit-post${i},1`);
            datoRaw = document.getElementById(`dat-prof-post${i},1`);
        }

        if (!datoRaw || !tituloRaw) continue;
        let titulo = tituloRaw.value.trim();
        let dato = datoRaw.value.trim();
        if (titulo && dato) {
            datosProfesionales[titulo] = dato;
        }
    }
    return datosProfesionales
}

// REGISTRAR [a un elemento valioso para el laboratorio]
async function registrarEmpleado() {
    
    try {
        contador > 0 ? datosProfesionales = tomarDatos(0) : datosProfesionales = null

        const datos = {
            cedula : document.getElementById("cedula-post").value.trim(),
            nombre : document.getElementById("nombre-post").value.trim(),
            apellido : document.getElementById("apellido-post").value.trim(),
            cargo : document.getElementById("cargo-post").value.trim(),
            telefono : document.getElementById("telefono-post").value.trim(),
            email : document.getElementById("correo-post").value.trim(),
            actividad : document.getElementById("actividad-post").value.trim(),
            datos_profesionales : datosProfesionales
        }
        const respuesta = await fetch ("/empleados", {
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(datos)
        })
        const json = await respuesta.json()
        if (respuesta.ok) {
            mostrarMensaje("Empleado registrado correctamente.", true, true);
            document.getElementById("post-formulario").reset();
            document.getElementById("contenedor-datos-post").innerHTML = "";
            contador = 0;
        } else {
            mostrarMensaje(json.detalle || json.error, false, false);
        }
    } catch (err) {
        mostrarMensaje("Error de conexion al registrar. " + err, false, false);
    }
    
}

/* mostrarMensaje("ostras como estamos w", true, false); */

// actualizar lets go w
async function actualizarEmpleado() {
    try {
        contador > 0 ? datosProfesionales = tomarDatos(1) : datosProfesionales = null;
        
        let cedulaAntiguaRaw  = document.getElementById("cedula-put");
        let cedulaNuevaRaw = document.getElementById("cedula-op-put");
        let cedulaDef = "no hay na"

        if (!cedulaAntiguaRaw) {
            mostrarMensaje("Error, debe incluir una cedula para actualizar a un empleado. " + err, false, false);
            return
        } else if (cedulaNuevaRaw.value.trim() === "") {
            cedulaDef = cedulaAntiguaRaw.value.trim();
        } else if (cedulaNuevaRaw.value.trim() !== "") {
            cedulaDef = cedulaNuevaRaw.value.trim();
        }

        const datos = {
            cedula : cedulaDef,
            nombre : document.getElementById("nombre-put").value.trim(),
            apellido : document.getElementById("apellido-put").value.trim(),
            cargo : document.getElementById("cargo-put").value.trim(),
            telefono : document.getElementById("telefono-put").value.trim(),
            email : document.getElementById("correo-put").value.trim(),
            actividad : document.getElementById("actividad-put").value.trim(),
            datos_profesionales : datosProfesionales
        }
        const respuesta = await fetch (`/empleados/?cedula=${cedulaAntiguaRaw.value.trim()}`, {
            method : "PUT",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(datos)
        })
        const json = await respuesta.json();
        if (respuesta.ok) {
            mostrarMensaje("Empleado actualizado correctamente. ", true, true);
            document.getElementById("put-formulario").reset();
            document.getElementById("contenedor-datos-put").innerHTML = "";
            contador = 0;
        } else {
            mostrarMensaje(json.detalle || json.error, false, false);
        }
    } catch(err) {
        mostrarMensaje("Error de conexion al registrar. " + err, false, false);
    }
}

// la funcion mas sencilla
async function eliminarEmpleado() {
    try {
        const cedula = document.getElementById("cedula-delete").value.trim();
        const resultado = await fetch(`/empleados/?cedula=${cedula}`, {
            method : "DELETE",
        })
        const json = await resultado.json();
        if (resultado.ok) {
            mostrarMensaje("Empleado eliminado correctamente. ", true, true);
            document.getElementById("delete-formulario").reset();
        } else {
            mostrarMensaje(json.detalle || json.error, false, false);
        }
    }catch(err){
        mostrarMensaje("Error de conexion al registrar. " + err, false, false);
    }
}