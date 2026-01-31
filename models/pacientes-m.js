const laboratorio = require(`../db-provisional/db`)
const { v4: uuidv4 } = require('uuid')

class pacientes {

    static async todos() {
        return new Promise((resolve, reject) => {
            try {
                resolve(laboratorio.pacientes)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async buscarCedula(cedula) {
        return new Promise((resolve, reject) => {
            try {
                if (!cedula || typeof cedula !== 'string') {
                    resolve(null)
                    return
                }

                const cedulaLimpia = cedula.trim()
                const paciente = laboratorio.pacientes.find(paciente => paciente.cedula === cedulaLimpia)
                resolve(paciente || null)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async crear(pacienteData) {
        return new Promise((resolve, reject) => {
            try {
                if (!pacienteData.cedula) {
                    reject(new Error(`la cedula es obligatoria para registrace`))
                    return
                }

                const cedulaLimpia = pacienteData.cedula.trim()

                const cedulaformato = /^V-\d{8}$/
                if (!cedulaformato.test(cedulaLimpia)) {
                    reject(new Error(`la cedula debe tener un formato de 8 digitos`))
                    return
                }

                const camposRequeridos = ['nombre', 'apellido', 'fechaNacimiento']
                const faltantes = camposRequeridos.filter(campo => !pacienteData[campo])

                if (faltantes.length > 0) {
                    reject(new Error(`Faltan campos requeridos: ${faltantes.join(', ')}`))
                    return
                }

                const fechaRegex = /^\d{4}-\d{2}-\d{2}$/
                if (pacienteData.fechaNacimiento && !fechaRegex.test(pacienteData.fechaNacimiento)) {
                    reject(new Error('La fecha de nacimiento debe tener el formato YYYY-MM-DD'))
                    return
                }

                const nuevoId = uuidv4()

                const nuevoPaciente = {
                    id: nuevoId,
                    cedula: cedulaLimpia,
                    nombre: pacienteData.nombre.trim(),
                    apellido: pacienteData.apellido.trim(),
                    fechaNacimiento: pacienteData.fechaNacimiento,
                    telefono: pacienteData.telefono ? pacienteData.telefono.trim() : '',
                    email: pacienteData.email ? pacienteData.email.trim().toLowerCase() : '',
                    direccion: pacienteData.direccion ? pacienteData.direccion.trim() : '',
                    fechaRegistro: new Date().toISOString().split('T')[0]
                }

                laboratorio.pacientes.push(nuevoPaciente)

                resolve(nuevoPaciente)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async actualizar(cedulaActual, pacienteData) {
        return new Promise((resolve, reject) => {
            try {
                if (!cedulaActual) {
                    reject(new Error('La cédula actual es obligatoria para actualizar un paciente'))
                    return
                }

                const pacienteIndex = laboratorio.pacientes.findIndex(p =>
                    p.cedula === cedulaActual
                )

                if (pacienteIndex === -1) {
                    resolve(null)
                    return
                }

                if (pacienteData.cedula && pacienteData.cedula !== cedulaActual) {
                    const cedulaRegex = /^V-\d{8}$/
                    if (!cedulaRegex.test(pacienteData.cedula)) {
                        reject(new Error('La nueva cédula debe tener el formato 8 digitos'))
                        return
                    }

                    const existeOtraCedula = laboratorio.pacientes.some(
                        (p, index) => p.cedula === pacienteData.cedula && index !== pacienteIndex
                    )

                    if (existeOtraCedula) {
                        reject(new Error(`La cédula ${pacienteData.cedula} ya está registrada en otro paciente`))
                        return
                    }
                }

                if (pacienteData.fechaNacimiento) {
                    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/
                    if (!fechaRegex.test(pacienteData.fechaNacimiento)) {
                        reject(new Error('La fecha de nacimiento debe tener el formato YYYY-MM-DD'))
                        return
                    }
                }

                const pacienteActualizado = {
                    ...laboratorio.pacientes[pacienteIndex],
                    ...pacienteData,
                    cedula: pacienteData.cedula || cedulaActual,
                    nombre: pacienteData.nombre ? pacienteData.nombre.trim() : laboratorio.pacientes[pacienteIndex].nombre,
                    apellido: pacienteData.apellido ? pacienteData.apellido.trim() : laboratorio.pacientes[pacienteIndex].apellido,
                    telefono: pacienteData.telefono ? pacienteData.telefono.trim() : laboratorio.pacientes[pacienteIndex].telefono,
                    email: pacienteData.email ? pacienteData.email.trim().toLowerCase() : laboratorio.pacientes[pacienteIndex].email,
                    direccion: pacienteData.direccion ? pacienteData.direccion.trim() : laboratorio.pacientes[pacienteIndex].direccion,
                }

                laboratorio.pacientes[pacienteIndex] = pacienteActualizado
                resolve(pacienteActualizado)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async delete(cedula) {
        return new Promise((resolve, reject) => {
            try {
                if (!cedula || typeof cedula !== 'string') {
                    reject(new Error('La cedula es obligatoria para eliminar un paciente'))
                    return
                }

                const pacienteIndex = laboratorio.pacientes.findIndex(
                    paciente => paciente.cedula === cedula
                )

                if (pacienteIndex === -1) {
                    resolve(null)
                    return
                }

                const [pacienteEliminado] = laboratorio.pacientes.splice(pacienteIndex, 1)

                resolve(pacienteEliminado)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async cuantos_pacientes() {
        return new Promise((resolve, reject) => {
            try {
                resolve(laboratorio.pacientes.length)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async buscaren_fechas(fechaInicio, fechaFin) {
        return new Promise((resolve, reject) => {
            try {
                const fechaRegex = /^\d{4}-\d{2}-\d{2}$/

                if (!fechaRegex.test(fechaInicio) || !fechaRegex.test(fechaFin)) {
                    reject(new Error('Las fechas deben tener el formato YYYY-MM-DD'))
                    return
                }

                const inicio = new Date(fechaInicio)
                const fin = new Date(fechaFin)

                if (inicio > fin) {
                    reject(new Error('La fecha de inicio debe ser menor o igual a la fecha de fin'))
                    return
                }

                fin.setHours(23, 59, 59, 999)

                const resultados = laboratorio.pacientes.filter(paciente => {
                    const fechaRegistro = new Date(paciente.fechaRegistro)
                    return fechaRegistro >= inicio && fechaRegistro <= fin
                })

                resolve(resultados)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async buscarId(id) {
        return new Promise((resolve, reject) => {
            try {
                if (!id) {
                    resolve(null)
                    return
                }

                const idBuscado = String(id)

                const paciente = laboratorio.pacientes.find(paciente => {
                    const pacienteId = String(paciente.id)
                    return pacienteId === idBuscado
                })

                resolve(paciente || null)
            } catch (error) {
                reject(error)
            }
        })
    }

    static async ultimos5() {
        return new Promise((resolve, reject) => {
            try {
                const pacientesOrdenados = [...laboratorio.pacientes]

                pacientesOrdenados.sort((a, b) => {
                    const fechaA = new Date(a.fechaRegistro)
                    const fechaB = new Date(b.fechaRegistro)

                    return fechaB - fechaA
                })

                resolve(pacientesOrdenados.slice(0, 5))
            } catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = pacientes
