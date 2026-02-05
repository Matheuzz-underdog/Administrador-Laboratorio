const empleados = [
    {
      id: "c435da1f-5f1a-4290-afd7-18162ab00bbb",
      cedula: "V-8765432",
      nombre: "María Paula",
      apellido: "Gonzalez Pineda",
      cargo: "Bioanalista Coordinador",
      datos_profesionales: {
        colegio_bioanalistas: "CB-1234",
        mpps: "111111",
      },
      usuario_sistema: {
        username: "mgonzalez",
        rol: "admin",
      },
      telefono: "0412-9876543",
      email: "maria.gonzalez13@gmail.com",
      activo: true,
    },
    {
      id: "019c2b7b-b01b-75ea-b2fd-f35ef4261bfa",
      cedula: "E-19480983",
      nombre: "Helena Soledad",
      apellido: "Cruz Linares",
      cargo: "Auxiliar de Servicios Generales",
      datos_profesionales: {
        observacion: "Encargada de limpieza y desechos biológicos",
      },
      usuario_sistema: null,
      telefono: "0414-9435454",
      email: "cruzlinares144@gmail.com",
      activo: true,
    },
    {
      id: "81d20793-a115-463d-bb3d-ddf470a89ef2",
      cedula: "V-35435454",
      nombre: "Pepito Pepitez",
      apellido: "Pepitero Pepitarez",
      cargo: "Asistente de Laboratorio",
      datos_profesionales: {
        certificacion: "Flebotomista",
        mpps: "222222",
      },
      usuario_sistema: {
        username: "ppepitez",
        rol: "tecnico",
      },
      telefono: "0416-9438650",
      email: "pepito@hotmail.com",
      activo: false,
    },
    {
      id: "37974052-f7ff-4b54-8277-3a445dd465e6",
      cedula: "V-4957039",
      nombre: "Ricardo David",
      apellido: "Lemus Dávila",
      cargo: "Bioanalista",
      datos_profesionales: {
        colegio_bioanalistas: "CB-5678",
        mpps: "333333",
      },
      usuario_sistema: {
        username: "rlemus",
        rol: "tecnico",
      },
      telefono: "0412-9876543",
      email: "ricardo09@gmail.com",
      activo: true,
    },
    {
      id: "6044c230-e58e-41c4-a22b-55493e7d9e86",
      cedula: "V-4957039",
      nombre: "Karen Paola",
      apellido: "Poli Necia",
      cargo: "Recepcionista",
      datos_profesionales: {
        turno: "Mañana",
      },
      usuario_sistema: {
        username: "kpoli",
        rol: "recepcion",
      },
      telefono: "0426-5469087",
      email: "karencita.uwu@outlook.com",
      activo: true,
    },
    {
      id: "0c929a2a-3454-41fe-8619-3831f4f03907",
      cedula: "E-3908549",
      nombre: "Roberto Damián",
      apellido: "Hernandez Rorschach",
      cargo: "Técnico de Equipos",
      datos_profesionales: {
        especialidad: "Mantenimiento de Microscopios y Centrifugas",
      },
      usuario_sistema: null,
      telefono: "0422-6349895",
      email: "porfiado.cuarteto@gmail.com",
      activo: false,
    },
];

module.exports = empleados;
