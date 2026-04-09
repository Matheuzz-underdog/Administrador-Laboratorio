const ventanaConfirmacion = document.getElementById(
  "confirmacion-todo-ventana",
);
const textoConfirmar = document.getElementById("valor-texto-confirmar");

const confirmarVentanaAbrir = (valor, entidad) => {
  if (valor === "borrar") {
    textoConfirmar.textContent = `¿Seguro que desea eliminar este ${entidad}?`;
    ventanaConfirmacion.style.display = "flex";
  }
  if (valor === "orden") {
    textoConfirmar.textContent = `¿Seguro que desea cambiar el estado de la orden?`;
    ventanaConfirmacion.style.display = "flex";
  }
  return new Promise((resolve) => {
    const btnSi = document.getElementById("btn-si");
    const btnNo = document.getElementById("btn-no");

    btnSi.onclick = () => {
      ventanaConfirmacion.style.display = "none";
      resolve(true);
    };
    btnNo.onclick = () => {
      ventanaConfirmacion.style.display = "none";
      resolve(false);
    };
  });
};

const cerrarConfirmacion = () => {
    ventanaConfirmacion.style.display = "none";
}
