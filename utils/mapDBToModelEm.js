function mapDBToModelEm(dbRow) {
    if (!dbRow) return null;
    return {
        id: dbRow.id_empleado, // bien
        cedula: dbRow.cedula_empleado, // bien 
        nombre: dbRow.nombre_empleado, // bien
        apellido: dbRow.apellido_empleado, // bien
        cargo: dbRow.cargo_empleado, // bien
        telefono: dbRow.telefono_empleado, // bien
        email: dbRow.email_empleado, // bien
        actividad: dbRow.actividad_empleado, // bien
        datos: dbRow.datos_profesionales
    };
}

module.exports= mapDBToModelEm