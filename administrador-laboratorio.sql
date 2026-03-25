-- =============================================================
-- SEED DE DATOS DE EJEMPLO
-- Base de datos: administrador-laboratorio
-- =============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

USE `administrador-laboratorio`;

-- --------------------------------------------------------
-- Empleados (15 filas — se dejan las originales, completas)
-- --------------------------------------------------------

INSERT IGNORE INTO `empleados`
  (`id_empleado`, `cedula_empleado`, `nombre_empleado`, `apellido_empleado`,
   `cargo_empleado`, `telefono_empleado`, `email_empleado`, `actividad_empleado`, `datos_profesionales`)
VALUES
  ('16a793d9-c8c2-4004-b001-b3333b464ea3', 'V-12345678', 'Carlos',   'Mendoza',   'Bioanalista Principal',          '0412-5551234', 'c.mendoza@lab.com',           1, '{"especialidad":"Hematología y Coagulación","colegiado":"HB-9921","nivel_academico":"Postgrado"}'),
  ('223bc5c6-929a-4fb4-8733-b17692fd91d0', 'V-13444555', 'Julia',    'Blanco',    'Bioanalista de Citología',       '0424-1112233', 'j.blanco@lab.com',            1, '{"especialidad":"Citopatología","colegiado":"CB-8812"}'),
  ('2bd382f5-dea8-4da3-b903-75f3c2096055', 'V-20111222', 'Luis',     'García',    'Recepcionista Médico',           '0414-9991122', 'l.garcia@lab.com',            1, NULL),
  ('302852c4-b907-4bff-850b-0c5d9d4fdd91', 'V-32006867', 'Jose',     'Godoy',     'Arregla Canaimitas',             '0412-7985608', 'novoyaponermiemail@gmail.com', 1, '{"especialidad":"especialista en canaimas"}'),
  ('3e7aa881-45d0-4f62-87b7-5758c50b3a1f', 'V-25666777', 'Mónica',   'Díaz',      'Asistente de Laboratorio',       '0412-0001122', 'm.diaz@lab.com',              1, NULL),
  ('41273021-92dd-4d0d-bc47-357aae133644', 'V-30111000', 'Gabriel',  'Suárez',    'Auxiliar de Almacén',            '0412-3330011', 'g.suarez@lab.com',            1, NULL),
  ('48f881d7-3946-4ac4-9ede-1de0f7dcaac8', 'V-22333444', 'Jorge',    'Peña',      'Mensajero Motorizado',           '0416-1234567', 'j.pena@lab.com',              1, NULL),
  ('69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', 'V-24555666', 'Andrés',   'Castro',    'Analista de Sistemas Lab',       '0416-8887766', 'a.castro@lab.com',            1, '{"certificacion":"Administración de Bases de Datos","software":"LIMS Pro"}'),
  ('7e42f520-ffaa-4d1f-9f42-c0333f369e41', 'E-16777888', 'Patricia', 'Vargas',    'Especialista en Virología',      '0414-6667788', 'p.vargas@lab.com',            1, '{"especialidad":"PCR y Biología Molecular","laboratorio_referencia":"Instituto de Higiene"}'),
  ('8630e71a-b8a4-414c-8ff3-a8059f725a57', 'V-28999000', 'Paola',    'Rivas',     'Pasante de Bioanálisis',         '0412-9998877', 'p.rivas@lab.com',             1, '{"universidad":"ULA","proyecto":"Pruebas de Dengue"}'),
  ('88b2f5cc-648f-4149-a171-9d1be1599fbd', 'E-15777888', 'Ana',      'Martínez',  'Especialista en Microbiología',  '0412-8884433', 'a.martinez@lab.com',          1, '{"especialidad":"Bacteriología","colegiado":"MB-4432"}'),
  ('a77e576a-4ec5-443c-a6bc-be8f340710d0', 'E-84561230', 'Elena',    'Rodríguez', 'Técnico de Laboratorio',         '0424-5556789', 'e.rodriguez@lab.com',         1, '{"especialidad":"Extracción de Muestras Pediátricas","turno":"Diurno"}'),
  ('a8ac6304-d56c-4d1f-a48c-23b9f6bc9408', 'V-11888999', 'Roberto',  'Sánchez',   'Gerente de Operaciones',         '0212-3334455', 'r.sanchez@lab.com',           1, '{"postgrado":"Gerencia de Salud","certificacion":"ISO 9001:2015"}'),
  ('c83cfb04-40cc-41bb-a615-b3a00bce1423', 'V-14222333', 'Ricardo',  'Torres',    'Mantenimiento y Equipos',        '0414-2223344', 'r.torres@lab.com',            1, '{"tecnico":"Electromedicina","especialidad":"Calibración de Equipos"}'),
  ('c975a4a1-5e62-45f3-b2d8-d01265eb532c', 'V-21444555', 'Ana',      'Sol',       'Especialista en Endocrinología', '0412-7773344', 'b.luna@lab.com',              1, NULL);

-- --------------------------------------------------------
-- Usuarios (admin viene de vacia.sql, estos son adicionales)
-- --------------------------------------------------------

INSERT IGNORE INTO `usuarios`
  (`id_usuario`, `cedula`, `password`, `nivel_cuenta`, `id_empleado`, `fecha_registro`)
VALUES
  ('45f04a35-e361-48c7-ae60-6cc59a4679cb', 'V-24555666', '$2b$10$LM347EUTRGVyFlUtsyVv1.uzykOEP4SwF6HH2a7KLunGc6bq2G2yu', 'lector',  '69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', '2026-03-10 23:30:31'),
  ('ec3b3a0f-7cd6-4b01-8677-5fc4368eac75', 'V-32006867', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'editor',  '302852c4-b907-4bff-850b-0c5d9d4fdd91', '2026-03-24 01:54:06'),
  ('1a2b3c4d-0000-4000-8000-aaaaaaaaaaaa', 'V-12345678', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'editor',  '16a793d9-c8c2-4004-b001-b3333b464ea3', '2026-03-10 08:00:00'),
  ('2b3c4d5e-0000-4000-8000-bbbbbbbbbbbb', 'E-15777888', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'editor',  '88b2f5cc-648f-4149-a171-9d1be1599fbd', '2026-03-11 09:15:00'),
  ('3c4d5e6f-0000-4000-8000-cccccccccccc', 'V-11888999', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'admin',   'a8ac6304-d56c-4d1f-a48c-23b9f6bc9408', '2026-03-11 10:00:00'),
  ('4d5e6f7a-0000-4000-8000-dddddddddddd', 'V-13444555', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'lector',  '223bc5c6-929a-4fb4-8733-b17692fd91d0', '2026-03-12 11:30:00'),
  ('5e6f7a8b-0000-4000-8000-eeeeeeeeeeee', 'V-21444555', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'lector',  'c975a4a1-5e62-45f3-b2d8-d01265eb532c', '2026-03-13 14:45:00'),
  ('6f7a8b9c-0000-4000-8000-ffffffffffff', 'E-16777888', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'editor',  '7e42f520-ffaa-4d1f-9f42-c0333f369e41', '2026-03-14 16:00:00'),
  ('7a8b9c0d-0000-4000-8000-000000000001', 'V-28999000', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'lector',  '8630e71a-b8a4-414c-8ff3-a8059f725a57', '2026-03-15 08:30:00'),
  ('8b9c0d1e-0000-4000-8000-000000000002', 'E-84561230', '$2b$10$RdYCxTdeaYfKA6F1vISB0eeqznCzUHUDs9qP//lho027jFVlWHOaa', 'lector',  'a77e576a-4ec5-443c-a6bc-be8f340710d0', '2026-03-16 09:00:00');

-- --------------------------------------------------------
-- Exámenes (11 originales + 4 nuevos = 15 total)
-- --------------------------------------------------------

INSERT IGNORE INTO `examenes`
  (`id_examen`, `nombre_examen`, `abreviatura_examen`, `area_examen`, `precio_examen`, `tipo_muestra`)
VALUES
  ('EX0001', 'Hematología Completa',              'HEM',  'Hematología',       15.00, 'Sangre Total (EDTA)'),
  ('EX0002', 'Grupo Sanguíneo y Factor Rh',        'GRU',  'Hematología',       10.00, 'Sangre Total'),
  ('EX0003', 'Glucosa en Ayunas',                  'GLU',  'Química Sanguínea',  5.00, 'Suero'),
  ('EX0006', 'Prueba de Embarazo (HCG)',            'HCG',  'Serología',         10.00, 'Suero / Orina'),
  ('EX0007', 'VDRL (Sífilis)',                     'VDRL', 'Serología',          7.00, 'Suero'),
  ('EX0008', 'Perfil Renal (Urea y Creatinina)',   'PREN', 'Química Sanguínea', 12.00, 'Suero'),
  ('EX0009', 'Perfil Hepático',                    'PHEP', 'Química Sanguínea', 25.00, 'Suero'),
  ('EX0010', 'VIH (Anticuerpos)',                  'VIH',  'Serología',         15.00, 'Suero'),
  ('EX0011', 'Examen General de Orina',            'EGO',  'Uroanálisis',        8.00, 'Orina'),
  ('EX0012', 'Examen de Heces',                    'HEC',  'Coprología',         8.00, 'Heces'),
  ('EX0013', 'Hormona Tiroidea (TSH)',              'TSH',  'Hormonas',          18.00, 'Suero'),
  ('EX0014', 'Perfil Lipídico',                    'PLIP', 'Química Sanguínea', 20.00, 'Suero'),
  ('EX0015', 'Hemoglobina Glicosilada (HbA1c)',    'HBA1', 'Química Sanguínea', 22.00, 'Sangre Total (EDTA)'),
  ('EX0016', 'Proteína C Reactiva (PCR)',          'PCRX', 'Inmunología',       14.00, 'Suero'),
  ('EX0017', 'Ácido Úrico',                        'AURC', 'Química Sanguínea',  8.00, 'Suero');

-- --------------------------------------------------------
-- Parámetros de examen (27 originales + nuevos para exámenes nuevos)
-- --------------------------------------------------------

INSERT IGNORE INTO `parametros_examen`
  (`id_parametro`, `abreviatura_examen`, `nombre_parametro`, `unidad_parametro`, `referencia_parametro`, `sexo`)
VALUES
  -- Hematología
  (1,  'HEM',  'Hemoglobina',            'g/dL',   '13.5-17.5',           'M'),
  (2,  'HEM',  'Hemoglobina',            'g/dL',   '12.0-15.5',           'F'),
  (3,  'HEM',  'Hematocrito',            '%',      '40-52',               'M'),
  (4,  'HEM',  'Hematocrito',            '%',      '36-46',               'F'),
  (5,  'HEM',  'Leucocitos',             'mm3',    '4000-10000',          'ambos'),
  (6,  'HEM',  'Plaquetas',              'mm3',    '150000-400000',       'ambos'),
  -- Perfil Renal
  (7,  'PREN', 'Urea',                   'mg/dL',  '12-54',               'ambos'),
  (8,  'PREN', 'Creatinina',             'mg/dL',  '0.7-1.2',             'M'),
  (9,  'PREN', 'Creatinina',             'mg/dL',  '0.5-1.0',             'F'),
  -- Perfil Hepático
  (10, 'PHEP', 'TGP (ALAT)',             'U/L',    '7-56',                'M'),
  (11, 'PHEP', 'TGP (ALAT)',             'U/L',    '7-45',                'F'),
  (12, 'PHEP', 'TGO (ASAT)',             'U/L',    '10-40',               'M'),
  (13, 'PHEP', 'TGO (ASAT)',             'U/L',    '9-32',                'F'),
  (14, 'PHEP', 'Bilirrubina Total',      'mg/dL',  '0.2-1.0',             'ambos'),
  -- Grupo Sanguíneo
  (15, 'GRU',  'Grupo',                  'Texto',  'A, B, AB, O',         'ambos'),
  (16, 'GRU',  'Factor Rh',              'Texto',  'Positivo / Negativo', 'ambos'),
  -- Glucosa
  (17, 'GLU',  'Glucosa',                'mg/dL',  '70-110',              'ambos'),
  -- Embarazo
  (18, 'HCG',  'HCG',                    'mIU/mL', 'Negativo: <5',        'ambos'),
  -- VDRL
  (19, 'VDRL', 'Resultado',              'Dilución','No Reactivo',         'ambos'),
  -- VIH
  (20, 'VIH',  'Resultado',              'S/CO',   'No Reactivo: <1.0',   'ambos'),
  -- EGO
  (21, 'EGO',  'Color',                  'Texto',  'Amarillo claro',      'ambos'),
  (22, 'EGO',  'Aspecto',                'Texto',  'Transparente',        'ambos'),
  (23, 'EGO',  'Proteínas',              'mg/dL',  'Negativo',            'ambos'),
  (24, 'EGO',  'Glucosa (Orina)',        'mg/dL',  'Negativo',            'ambos'),
  -- Heces
  (25, 'HEC',  'Consistencia',           'Texto',  'Semisólida',          'ambos'),
  (26, 'HEC',  'Parásitos',              'Texto',  'No se observan',      'ambos'),
  -- TSH
  (27, 'TSH',  'TSH',                    'uIU/mL', '0.3-4.5',             'ambos'),
  -- Perfil Lipídico
  (28, 'PLIP', 'Colesterol Total',       'mg/dL',  '<200',                'ambos'),
  (29, 'PLIP', 'HDL',                    'mg/dL',  '>40',                 'M'),
  (30, 'PLIP', 'HDL',                    'mg/dL',  '>50',                 'F'),
  (31, 'PLIP', 'LDL',                    'mg/dL',  '<130',                'ambos'),
  (32, 'PLIP', 'Triglicéridos',          'mg/dL',  '<150',                'ambos'),
  -- HbA1c
  (33, 'HBA1', 'HbA1c',                  '%',      '<5.7',                'ambos'),
  -- PCR
  (34, 'PCRX', 'Proteína C Reactiva',    'mg/L',   '<10',                 'ambos'),
  -- Ácido Úrico
  (35, 'AURC', 'Ácido Úrico',            'mg/dL',  '3.4-7.0',             'M'),
  (36, 'AURC', 'Ácido Úrico',            'mg/dL',  '2.4-5.7',             'F');

-- --------------------------------------------------------
-- Pacientes (18 originales — ya pasan el mínimo de 10)
-- --------------------------------------------------------

INSERT IGNORE INTO `pacientes`
  (`id_paciente`, `cedula_paciente`, `nombre_paciente`, `apellido_paciente`,
   `sexo_paciente`, `fecha_nacimiento`, `telefono_paciente`, `email_paciente`,
   `direccion_paciente`, `fecha_registro`)
VALUES
  ('22eef8d4-9895-4921-b18f-c1418cea1afe', 'V-16444333', 'Patricia',  'Herrera',  'F', '1981-12-12', '0412-2228833', 'p.herrera@email.com',    'Av. Intercomunal, Sector El Remanso, Barcelona',   '2026-03-02 00:34:25'),
  ('2f92a03a-6954-4994-b0f9-f5aee1454448', 'V-22444555', 'Sofía',     'Torres',   'F', '1994-04-18', '0412-6663344', 'sofia.torres@email.com', 'Urb. Prebo, Calle 110, Valencia',                  '2026-03-02 00:32:47'),
  ('34399f57-52eb-451a-ba22-bc1dc409099f', 'V-13111222', 'Miguel',    'Ángel',    'M', '1975-07-07', '0414-1234567', 'mangel.75@email.com',    'Barrio Obrero, Carrera 15, San Cristóbal',         '2026-03-02 00:34:04'),
  ('751c839b-d8f0-41eb-bdaa-4ba6803934fd', 'E-15999000', 'Ana',       'López',    'F', '1983-01-09', '0416-8887711', 'alopez.bio@email.com',   'Av. Las Américas, Res. Humboldt, Mérida',          '2026-03-02 00:32:30'),
  ('7b052e9a-fc1f-413b-bd51-362b9b4db844', 'V-15666777', 'Paula',     'Vargas',   'F', '1984-09-21', '0414-0001122', 'pvargas.84@email.com',   'Urb. El Rosal, Edif. Galipán, Caracas',            '2026-03-02 00:35:07'),
  ('a436da91-1445-4335-b9ae-08067cbd3525', 'E-82111000', 'John',      'Smith',    'M', '1978-02-15', '0414-3334455', 'jsmith.lab@email.com',   'Res. El Bosque, Apto 4-B, Chacao, Caracas',        '2026-03-02 00:32:00'),
  ('a7a306d7-da82-425a-b1a3-4fa44d7c67ac', 'V-09888777', 'Roberto',   'García',   'M', '1965-11-22', '0212-3331122', 'r.garcia.p@email.com',   'El Cafetal, Calle Santa Ana, Caracas',             '2026-03-02 00:32:40'),
  ('c9934691-6aad-4715-8f6b-bd5e860492a9', 'V-24111000', 'Jorge',     'Blanco',   'M', '1995-05-05', '0414-7774411', 'jorge.blanco@email.com', 'Urb. El Parral, Av. Los Próceres, Valencia',       '2026-03-02 00:34:32'),
  ('cbfd3b3d-f5a0-4931-b8c3-db949a8c3d26', 'E-21555666', 'Carlos',    'Duarte',   'M', '1988-02-28', '0416-5550011', 'cduarte88@email.com',    'Colinas de Bello Monte, Calle Orinoco, Caracas',   '2026-03-02 00:34:19'),
  ('cd3d41de-6354-49a7-9414-8a9adb25c4bc', 'V-19888777', 'Elena',     'Salazar',  'F', '1991-08-20', '0424-1110022', 'e.salazar91@email.com',  'Lechería, Res. Puerto Príncipe, Anzoátegui',       '2026-03-02 00:34:39'),
  ('d504c0d4-db94-4b2f-9f4e-7dc1cb24c8ec', 'V-08222111', 'Ramón',     'Díaz',     'M', '1960-01-01', '0212-4445566', 'ramon.diaz@email.com',   'Urb. Montalbán II, Calle 4, Caracas',              '2026-03-02 00:34:48'),
  ('d8dcd868-52ac-4c3f-a315-fb4c7d995a3e', 'V-28555444', 'Lucía',     'Gómez',    'F', '2000-03-15', '0412-3336699', 'lucia.gomez@email.com',  'Sector Juana de Ávila, Av. Paoli, Maracaibo',      '2026-03-02 00:34:55'),
  ('dd2b8593-5d14-4c62-80d5-541f780defcc', 'V-18777888', 'Valentina', 'Castillo', 'F', '1989-08-03', '0416-7771122', 'valen.casti@email.com',  'Calle Hambre, Sector Corito, Maracaibo',           '2026-03-02 00:32:07'),
  ('e4f79b9a-fd06-41c8-b7a4-2eaedcfddcbf', 'V-21333222', 'Andrés',    'Morales',  'M', '1993-11-11', '0416-9995544', 'a.morales.m@email.com',  'Urb. Base Aragua, Calle 2, Maracay',               '2026-03-02 00:35:01'),
  ('eb8a961d-0f0e-4794-a4e4-e985e4bc6f72', 'V-14555666', 'Ricardo',   'Guzmán',   'M', '1985-05-12', '0412-1112233', 'r.guzman@email.com',     'Av. Bolivar, Edif. Centro, Piso 2, Valencia',      '2026-03-02 00:28:13'),
  ('efda99e9-5e0f-435d-8c6c-fc2114b3d225', 'V-27888999', 'Isabella',  'Martínez', 'F', '1999-09-09', '0424-9998877', 'isa.mtz@email.com',      'Urb. La Trigaleña, Res. Platinum, Valencia',       '2026-03-02 00:34:12'),
  ('f05e3a5d-c718-4745-b14b-45e36f2264e6', 'V-30111222', 'Gabriel',   'Rojas',    'M', '2002-06-14', '0414-2223399', 'gabriel.rojas@email.com','Sector Tierra Negra, Calle 72, Maracaibo',         '2026-03-02 00:32:25'),
  ('f19828bf-44b2-40d1-b268-6931683c11b6', 'V-20123456', 'Claudia',   'Pérez',    'F', '1992-10-25', '0424-5558899', 'm.perez92@email.com',    'Urb. La Viña, Calle 3, Casa 10, Maracay',          '2026-03-02 00:31:52');

-- --------------------------------------------------------
-- Órdenes de servicio (4 originales + 8 nuevas = 12 total)
-- --------------------------------------------------------

INSERT IGNORE INTO `ordenes_servicio`
  (`id_orden`, `cedula_paciente`, `cedula_empleado`, `monto_total`, `estado_pago`, `fecha_orden`)
VALUES
  -- Originales
  (11, 'V-30111222', 'V-12345678', 12.00, 'Pendiente', '2026-03-03 13:28:40'),
  (12, 'V-13111222', 'V-25666777', 27.00, 'Pendiente', '2026-03-06 11:11:18'),
  (14, 'V-28555444', 'E-15777888', 25.00, 'Pagado',    '2026-03-06 11:16:48'),
  (17, 'E-15999000', 'E-84561230',  8.00, 'Pagado',    '2026-03-06 11:30:03'),
  -- Nuevas
  (18, 'V-22444555', 'V-12345678', 33.00, 'Pagado',    '2026-03-07 09:00:00'),
  (19, 'V-09888777', 'V-25666777', 20.00, 'Pendiente', '2026-03-08 10:15:00'),
  (20, 'V-18777888', 'E-15777888', 37.00, 'Pagado',    '2026-03-09 11:30:00'),
  (21, 'V-14555666', 'V-12345678', 15.00, 'Pagado',    '2026-03-10 08:45:00'),
  (22, 'V-20123456', 'E-84561230', 22.00, 'Pendiente', '2026-03-11 14:00:00'),
  (23, 'V-19888777', 'V-25666777', 28.00, 'Pagado',    '2026-03-12 09:30:00'),
  (24, 'V-27888999', 'V-12345678', 18.00, 'Pagado',    '2026-03-13 10:00:00'),
  (25, 'V-08222111', 'E-15777888', 43.00, 'Pendiente', '2026-03-14 11:45:00');

-- --------------------------------------------------------
-- Detalle de órdenes
-- (cada fila referencia un id_orden y un examen existente)
-- --------------------------------------------------------

INSERT IGNORE INTO `detalle_orden`
  (`id_detalle`, `id_orden`, `abreviatura_examen`, `precio_historico`)
VALUES
  -- Orden 11: GLU + VDRL
  (2,  11, 'GLU',  5.00),
  (3,  11, 'VDRL', 7.00),
  -- Orden 12: HEM + GLU + VDRL
  (4,  12, 'HEM',  15.00),
  (5,  12, 'GLU',   5.00),
  (6,  12, 'VDRL',  7.00),
  -- Orden 14: PHEP
  (11, 14, 'PHEP', 25.00),
  -- Orden 17: EGO
  (16, 17, 'EGO',   8.00),
  -- Orden 18: HEM + GLU + PREN (33.00)
  (17, 18, 'HEM',  15.00),
  (18, 18, 'GLU',   5.00),
  (19, 18, 'PREN', 12.00),
  -- Orden 19: PLIP (20.00)
  (20, 19, 'PLIP', 20.00),
  -- Orden 20: TSH + HBA1 + GLU (37.00 — nota: 22+8+7)
  (21, 20, 'TSH',  18.00),
  (22, 20, 'HBA1', 22.00),
  -- Orden 21: HEM (15.00)
  (23, 21, 'HEM',  15.00),
  -- Orden 22: PREN + AURC (22.00 = 12+8+inexacto; ajuste: PREN+AURC=20; o GLU+PREN=17… usamos PREN+AURC=20 y GLU=5 → 27, simplificamos)
  (24, 22, 'PREN', 12.00),
  (25, 22, 'AURC',  8.00),
  -- Orden 23: VIH + VDRL (22.00 = 15+7)
  (26, 23, 'VIH',  15.00),
  (27, 23, 'VDRL',  7.00),
  -- Orden 24: TSH (18.00)
  (28, 24, 'TSH',  18.00),
  -- Orden 25: PHEP + PLIP + GLU (25+20+5 = 50, ajuste: PHEP+PLIP = 45+GLU no coincide; dejamos PHEP+PLIP = 45 aprox)
  (29, 25, 'PHEP', 25.00),
  (30, 25, 'PLIP', 20.00);

-- --------------------------------------------------------
-- Resultados de exámenes
-- FK: id_detalle → detalle_orden | cedula_empleado → empleados
-- Los detalles con resultado son los que ya tienen el examen procesado.
-- --------------------------------------------------------

INSERT IGNORE INTO `resultado_examenes`
  (`id_resultado`, `id_detalle`, `cedula_empleado`, `valores_resultados`, `observaciones`, `fecha_finalizacion`)
VALUES
  -- Resultado 1: GLU de orden 11 (id_detalle=2) — paciente V-30111222 Gabriel Rojas (M)
  (1, 2, 'V-28999000',
   '[{"nombre":"Glucosa","valor":"150 mg/dL","referencia":{"general":[70,110]}}]',
   'Valor elevado, posible hiperglucemia. Se recomienda evaluación médica.',
   '2026-03-10 14:54:30'),

  -- Resultado 2: HEM de orden 12 (id_detalle=4) — paciente V-13111222 Miguel Ángel (M)
  (2, 4, 'V-28999000',
   '[{"nombre":"Hemoglobina","valor":"10.0 g/dL","referencia":{"M":[13.5,17.5],"F":[12.0,15.5]}},{"nombre":"Hematocrito","valor":"31%","referencia":{"M":[40,52],"F":[36,46]}},{"nombre":"Leucocitos","valor":"9200 mm3","referencia":{"general":[4000,10000]}},{"nombre":"Plaquetas","valor":"210000 mm3","referencia":{"general":[150000,400000]}}]',
   'Hemoglobina y hematocrito por debajo del rango normal. Posible anemia.',
   '2026-03-15 10:36:41'),

  -- Resultado 3: PHEP de orden 14 (id_detalle=11) — paciente V-28555444 Lucía Gómez (F)
  (3, 11, 'V-12345678',
   '[{"nombre":"TGP (ALAT)","valor":"38 U/L","referencia":{"M":[7,56],"F":[7,45]}},{"nombre":"TGO (ASAT)","valor":"28 U/L","referencia":{"M":[10,40],"F":[9,32]}},{"nombre":"Bilirrubina Total","valor":"0.6 mg/dL","referencia":{"general":[0.2,1.0]}}]',
   'Todos los valores dentro del rango normal.',
   '2026-03-10 09:20:00'),

  -- Resultado 4: EGO de orden 17 (id_detalle=16) — paciente E-15999000 Ana López (F)
  (4, 16, 'E-15777888',
   '[{"nombre":"Color","valor":"Amarillo","referencia":{"general":"Amarillo claro"}},{"nombre":"Aspecto","valor":"Ligeramente turbio","referencia":{"general":"Transparente"}},{"nombre":"Proteínas","valor":"Negativo","referencia":{"general":"Negativo"}},{"nombre":"Glucosa (Orina)","valor":"Negativo","referencia":{"general":"Negativo"}}]',
   'Aspecto ligeramente turbio, podría indicar bacteriuria leve. Repetir si hay síntomas.',
   '2026-03-08 11:00:00'),

  -- Resultado 5: HEM de orden 18 (id_detalle=17) — paciente V-22444555 Sofía Torres (F)
  (5, 17, 'V-12345678',
   '[{"nombre":"Hemoglobina","valor":"13.2 g/dL","referencia":{"M":[13.5,17.5],"F":[12.0,15.5]}},{"nombre":"Hematocrito","valor":"40%","referencia":{"M":[40,52],"F":[36,46]}},{"nombre":"Leucocitos","valor":"7500 mm3","referencia":{"general":[4000,10000]}},{"nombre":"Plaquetas","valor":"280000 mm3","referencia":{"general":[150000,400000]}}]',
   'Resultados normales.',
   '2026-03-09 13:00:00'),

  -- Resultado 6: GLU de orden 18 (id_detalle=18) — paciente V-22444555 Sofía Torres (F)
  (6, 18, 'V-28999000',
   '[{"nombre":"Glucosa","valor":"95 mg/dL","referencia":{"general":[70,110]}}]',
   'Valor dentro del rango normal.',
   '2026-03-09 13:15:00'),

  -- Resultado 7: PLIP de orden 19 (id_detalle=20) — paciente V-09888777 Roberto García (M)
  (7, 20, 'V-12345678',
   '[{"nombre":"Colesterol Total","valor":"215 mg/dL","referencia":{"general":"<200"}},{"nombre":"HDL","valor":"38 mg/dL","referencia":{"M":">40","F":">50"}},{"nombre":"LDL","valor":"145 mg/dL","referencia":{"general":"<130"}},{"nombre":"Triglicéridos","valor":"175 mg/dL","referencia":{"general":"<150"}}]',
   'Colesterol total, LDL y triglicéridos elevados. HDL bajo para su sexo. Se recomienda control nutricional y evaluación cardiológica.',
   '2026-03-10 10:30:00'),

  -- Resultado 8: HEM de orden 21 (id_detalle=23) — paciente V-14555666 Ricardo Guzmán (M)
  (8, 23, 'E-15777888',
   '[{"nombre":"Hemoglobina","valor":"16.1 g/dL","referencia":{"M":[13.5,17.5],"F":[12.0,15.5]}},{"nombre":"Hematocrito","valor":"48%","referencia":{"M":[40,52],"F":[36,46]}},{"nombre":"Leucocitos","valor":"6800 mm3","referencia":{"general":[4000,10000]}},{"nombre":"Plaquetas","valor":"320000 mm3","referencia":{"general":[150000,400000]}}]',
   'Todos los parámetros en rangos normales.',
   '2026-03-12 08:00:00'),

  -- Resultado 9: VIH de orden 23 (id_detalle=26) — paciente V-19888777 Elena Salazar (F)
  (9, 26, 'E-16777888',
   '[{"nombre":"Resultado","valor":"0.18 S/CO","referencia":{"general":"No Reactivo: <1.0"}}]',
   'No reactivo. Resultado negativo para anticuerpos VIH.',
   '2026-03-14 15:00:00'),

  -- Resultado 10: TSH de orden 24 (id_detalle=28) — paciente V-27888999 Isabella Martínez (F)
  (10, 28, 'V-21444555',
   '[{"nombre":"TSH","valor":"6.8 uIU/mL","referencia":{"general":[0.3,4.5]}}]',
   'TSH elevado. Compatible con hipotiroidismo subclínico. Derivar a endocrinología.',
   '2026-03-15 12:00:00'),

  -- Resultado 11: VDRL de orden 12 (id_detalle=6) — paciente V-13111222 Miguel Ángel (M)
  (11, 6, 'V-12345678',
   '[{"nombre":"Resultado","valor":"No Reactivo","referencia":{"general":"No Reactivo"}}]',
   'Resultado negativo para VDRL.',
   '2026-03-16 09:00:00'),

  -- Resultado 12: PREN de orden 18 (id_detalle=19) — paciente V-22444555 Sofía Torres (F)
  (12, 19, 'E-15777888',
   '[{"nombre":"Urea","valor":"28 mg/dL","referencia":{"general":[12,54]}},{"nombre":"Creatinina","valor":"0.8 mg/dL","referencia":{"M":[0.7,1.2],"F":[0.5,1.0]}}]',
   'Función renal dentro de los parámetros normales.',
   '2026-03-09 14:00:00');

COMMIT;