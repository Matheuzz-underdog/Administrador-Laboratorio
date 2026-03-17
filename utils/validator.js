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

  static password(passwordEnv) {
    if (!passwordEnv || typeof passwordEnv !== 'string') {
      return { valido: false, error: 'La contraseña es requerida' };
    }
    if (passwordEnv.length < 6) {
      return { valido: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }
    // No permite comillas simples ni dobles
    if (/['"]/.test(passwordEnv)) {
      return { valido: false, error: 'La contraseña no puede contener comillas' };
    }
    return { valido: true };
  }

  static sanitizar(str) {
    if (!str || typeof str !== 'string') return '';
    // Elimina comillas simples y dobles
    return str.replace(/['"]/g, '');
  }

  // Exclusivo de examenes
  static longitud(abrev) {
    if (abrev.length < 3 || abrev.length > 4) return false;
    return true;
  }
}

module.exports = Validador;
