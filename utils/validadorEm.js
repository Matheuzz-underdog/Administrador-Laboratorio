class ValidadorEm {
    static cedula(cedEnv) {
        const formato = /^[VE]-\d{6,8}$/;
        return formato.test(cedEnv);
    }

    static telefono(tlfEnv) {
        const formato = /^(0414|0424|0412|0422|0416|0426|02\d{2})[- ]\d{7}$/;
        return formato.test(tlfEnv);
    }

    static actividad(dato) {
        if (dato === "1" || dato === "0") {
            return true
        } else {
            return false
        }
    }

    static email(emailEnv) {
        if (!emailEnv) return true;
        const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formato.test(emailEnv);
    }

    static json(valor) {
        try {
            if (typeof valor === "string") {
                JSON.parse(valor);
                return 1;
            } else if (typeof valor === "object" && valor !== null) {
                JSON.stringify(valor);
                return 2;
            }
            return 0
        } catch(err){
            return 0
        }
    }
}

module.exports = ValidadorEm