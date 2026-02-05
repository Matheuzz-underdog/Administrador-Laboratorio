const generar = (listaExamenes) => {
  if (listaExamenes.length === 0) return "ex-001";

  const numeros = listaExamenes.map((ex) => parseInt(ex.id.split("-")[1]));
  const maxNumero = Math.max(...numeros);

  const nuevoNumero = maxNumero + 1;
  return `ex-${nuevoNumero.toString().padStart(3, "0")}`;
}

module.exports = generar;
