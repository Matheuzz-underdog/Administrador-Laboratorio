class Validador {
  static cedula(cedEnv) {
    const formato = /^[VE]-\d{6,8}$/;
    return formato.test(cedEnv);
  }

  static telefono(tlfEnv) {
    const formato = /^(0414|0424|0412|0422|0416|0426|02\d{2})[- ]?\d{7}$/;
    return formato.test(tlfEnv);
  }

  /* Por ahora no se usa */
  // y quizas nunca

  // static rif(rifEnv) {
  //   const formato = /^[VJPG]-\d{8,9}$/;;
  //   return formato.test(rifEnv);
  // }

  static fecha(fechaEnv) {
    const formato = /^\d{4}-\d{2}-\d{2}$/;
    if (!formato.test(fechaEnv)) return false;

    const fechaObj = new Date(fechaEnv);
    return fechaObj instanceof Date && !isNaN(fechaObj);
  }

  static email(emailEnv) {
    if (!emailEnv) return true;
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formato.test(emailEnv);
  }
}

module.exports = Validador;
