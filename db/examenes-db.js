const examenes = [
  // ÁREA: HEMATOLOGÍA
  {
    id: "ex-001",
    nombre: "Hematología Completa",
    abreviatura: "HEM",
    area: "Hematología",
    precio: 15.0,
    tipoMuestra: "Sangre Total (EDTA)",
    parametros: [
      {
        nombre: "Hemoglobina",
        unidad: "g/dL",
        referencia: { M: [13.5, 17.5], F: [12.0, 16.0] },
      },
      {
        nombre: "Hematocrito",
        unidad: "%",
        referencia: { M: [41, 50], F: [36, 44] },
      },
      {
        nombre: "Leucocitos",
        unidad: "mm3",
        referencia: { general: [4500, 11000] },
      },
      {
        nombre: "Plaquetas",
        unidad: "mm3",
        referencia: { general: [150000, 450000] },
      },
    ],
  },
  {
    id: "ex-005",
    nombre: "Grupo Sanguíneo y Factor Rh",
    abreviatura: "GRU",
    area: "Hematología",
    precio: 10.0,
    tipoMuestra: "Sangre Total",
    parametros: [
      { nombre: "Grupo", unidad: "Texto", referencia: { tipo: "cualitativo" } },
      {
        nombre: "Factor Rh",
        unidad: "Texto",
        referencia: { tipo: "cualitativo" },
      },
    ],
  },

  // QUÍMICA SANGUÍNEA
  {
    id: "ex-002",
    nombre: "Glucosa en Ayunas",
    abreviatura: "GLU",
    area: "Química Sanguínea",
    precio: 5.0,
    tipoMuestra: "Suero",
    parametros: [
      {
        nombre: "Glucosa",
        unidad: "mg/dL",
        referencia: { general: [70, 110] },
      },
    ],
  },
  {
    id: "ex-006",
    nombre: "Perfil Renal (Urea y Creatinina)",
    abreviatura: "PREN",
    area: "Química Sanguínea",
    precio: 12.0,
    tipoMuestra: "Suero",
    parametros: [
      { nombre: "Urea", unidad: "mg/dL", referencia: { general: [15, 45] } },
      {
        nombre: "Creatinina",
        unidad: "mg/dL",
        referencia: { M: [0.7, 1.3], F: [0.6, 1.1] },
      },
    ],
  },
  {
    id: "ex-007",
    nombre: "Perfil Hepático",
    abreviatura: "PHEP",
    area: "Química Sanguínea",
    precio: 25.0,
    tipoMuestra: "Suero",
    parametros: [
      { nombre: "TGP (ALAT)", unidad: "U/L", referencia: { general: [0, 41] } },
      { nombre: "TGO (ASAT)", unidad: "U/L", referencia: { general: [0, 40] } },
      {
        nombre: "Bilirrubina Total",
        unidad: "mg/dL",
        referencia: { general: [0.1, 1.2] },
      },
    ],
  },

  // SEROLOGÍA / INMUNOLOGÍA
  {
    id: "ex-008",
    nombre: "Prueba de Embarazo (HCG)",
    abreviatura: "HCG",
    area: "Serología",
    precio: 10.0,
    tipoMuestra: "Suero / Orina",
    parametros: [
      {
        nombre: "HCG",
        unidad: "mIU/mL",
        referencia: { tipo: "cualitativo", notas: "Positivo/Negativo" },
      },
    ],
  },
  {
    id: "ex-009",
    nombre: "VDRL (Sífilis)",
    abreviatura: "VDRL",
    area: "Serología",
    precio: 7.0,
    tipoMuestra: "Suero",
    parametros: [
      {
        nombre: "Resultado",
        unidad: "Dilución",
        referencia: { tipo: "cualitativo", notas: "No Reactivo" },
      },
    ],
  },
  {
    id: "ex-010",
    nombre: "VIH (Anticuerpos)",
    abreviatura: "VIH",
    area: "Serología",
    precio: 15.0,
    tipoMuestra: "Suero",
    parametros: [
      {
        nombre: "Resultado",
        unidad: "S/CO",
        referencia: { tipo: "cualitativo", notas: "No Reactivo" },
      },
    ],
  },

  // COPROLOGÍA / UROANÁLISIS
  {
    id: "ex-004",
    nombre: "Examen General de Orina",
    abreviatura: "EGO",
    area: "Uroanálisis",
    precio: 8.0,
    tipoMuestra: "Orina",
    parametros: [
      { nombre: "Color", unidad: "Texto", referencia: { tipo: "cualitativo" } },
      {
        nombre: "Aspecto",
        unidad: "Texto",
        referencia: { tipo: "cualitativo" },
      },
      {
        nombre: "Proteínas",
        unidad: "mg/dL",
        referencia: { general: [0, 30] },
      },
      {
        nombre: "Glucosa (Orina)",
        unidad: "mg/dL",
        referencia: { general: [0, 0.8] },
      },
    ],
  },
  {
    id: "ex-011",
    nombre: "Examen de Heces",
    abreviatura: "HEC",
    area: "Coprología",
    precio: 8.0,
    tipoMuestra: "Heces",
    parametros: [
      {
        nombre: "Consistencia",
        unidad: "Texto",
        referencia: { tipo: "cualitativo" },
      },
      {
        nombre: "Parásitos",
        unidad: "Texto",
        referencia: { tipo: "cualitativo", notas: "No se observan" },
      },
    ],
  },

  // Hormonas
  {
    id: "ex-003",
    nombre: "Hormona Tiroidea (TSH)",
    abreviatura: "TSH",
    area: "Hormonas",
    precio: 18.0,
    tipoMuestra: "Suero",
    parametros: [
      { nombre: "TSH", unidad: "uIU/mL", referencia: { general: [0.4, 4.2] } },
    ],
  },
];

module.exports = examenes;
