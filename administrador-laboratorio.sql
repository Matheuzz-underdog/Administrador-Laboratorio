-- =============================================================
-- SEED DE DATOS DE EJEMPLO
-- Base de datos: administrador-laboratorio
-- IMPORTANTE: Ejecutar DESPUÉS de estructura.sql
-- =============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

USE `administrador-laboratorio`;

-- --------------------------------------------------------
-- Empleados
-- --------------------------------------------------------

INSERT IGNORE INTO `empleados`
  (`id_empleado`, `cedula_empleado`, `nombre_empleado`, `apellido_empleado`,
   `cargo_empleado`, `telefono_empleado`, `email_empleado`, `actividad_empleado`, `datos_profesionales`)
VALUES
  ('d2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', 'V-12345678', 'Admin',    'Principal',  'Administrador',               '0412-1234567', 'admin@lab.com',       1, '{"cargo":"admin","departamento":"Sistemas"}'),
  ('16a793d9-c8c2-4004-b001-b3333b464ea3', 'V-22345678', 'Carlos',   'Mendoza',    'Bioanalista Principal',        '0412-5551234', 'c.mendoza@lab.com',   1, '{"especialidad":"Hematología","colegiado":"HB-9921"}'),
  ('223bc5c6-929a-4fb4-8733-b17692fd91d0', 'V-23456789', 'Julia',    'Blanco',     'Bioanalista',                 '0424-1112233', 'j.blanco@lab.com',    1, '{"especialidad":"Citopatología","colegiado":"CB-8812"}'),
  ('2bd382f5-dea8-4da3-b903-75f3c2096055', 'V-34567890', 'Luis',     'García',     'Recepcionista',               '0414-9991122', 'l.garcia@lab.com',    1, NULL),
  ('3e7aa881-45d0-4f62-87b7-5758c50b3a1f', 'V-45678901', 'Mónica',   'Díaz',       'Asistente de Laboratorio',    '0412-0001122', 'm.diaz@lab.com',      1, NULL),
  ('41273021-92dd-4d0d-bc47-357aae133644', 'V-56789012', 'Gabriel',  'Suárez',     'Auxiliar de Almacén',         '0412-3330011', 'g.suarez@lab.com',    1, NULL),
  ('48f881d7-3946-4ac4-9ede-1de0f7dcaac8', 'V-67890123', 'Jorge',    'Peña',       'Mensajero',                   '0416-1234567', 'j.pena@lab.com',      1, NULL),
  ('69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', 'V-78901234', 'Andrés',   'Castro',     'Analista de Sistemas',        '0416-8887766', 'a.castro@lab.com',    1, '{"certificacion":"Bases de Datos"}'),
  ('7e42f520-ffaa-4d1f-9f42-c0333f369e41', 'E-89012345', 'Patricia', 'Vargas',     'Especialista en Virología',   '0414-6667788', 'p.vargas@lab.com',    1, '{"especialidad":"PCR"}'),
  ('8630e71a-b8a4-414c-8ff3-a8059f725a57', 'V-90123456', 'Paola',    'Rivas',      'Pasante de Bioanálisis',      '0412-9998877', 'p.rivas@lab.com',     1, '{"universidad":"ULA"}'),
  ('88b2f5cc-648f-4149-a171-9d1be1599fbd', 'E-01234567', 'Ana',      'Martínez',   'Especialista en Microbiología','0412-8884433', 'a.martinez@lab.com',  1, '{"especialidad":"Bacteriología"}');

-- --------------------------------------------------------
-- Usuarios (UUIDs corregidos — solo caracteres 0-9 y a-f)
-- --------------------------------------------------------

INSERT IGNORE INTO `usuarios`
  (`id_usuario`, `cedula`, `password`, `nivel_cuenta`, `id_empleado`, `fecha_registro`)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'V-12345678', '$2b$10$0tSgXBbdHGBJEAR6MC4pT.sZKPoEuu9N4s17FR9pCSKL4rmslysty', 'admin',  'd2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', '2026-03-01 00:00:00'),
  ('45f04a35-e361-48c7-ae60-6cc59a4679cb', 'V-22345678', '$2b$10$LM347EUTRGVyFlUtsyVv1.uzykOEP4SwF6HH2a7KLunGc6bq2G2yu', 'editor', '16a793d9-c8c2-4004-b001-b3333b464ea3', '2026-03-01 00:00:00'),
  ('55f15a46-f482-49d8-bf71-7dd70b5780fc', 'V-23456789', '$2b$10$MN458FVHSGzGlUGtwVv2.0a0lqPHG4Sx7GI3b8KLoqHe8lrtnG3uz', 'editor', '223bc5c6-929a-4fb4-8733-b17692fd91d0', '2026-03-01 00:00:00'),
  ('65f26a57-a593-40e9-ac82-8ee81c6910db', 'V-34567890', '$2b$10$OP569GWITHzHmVHuxWw3.1b1mrQIH5Ty8HJ4c9KMrpJf9msuH4ve', 'lector', '2bd382f5-dea8-4da3-b903-75f3c2096055', '2026-03-01 00:00:00'),
  ('75f37a68-b604-41f0-ab93-9ff92d7020ec', 'V-45678901', '$2b$10$PQ670HXJUI1InOVyXx4.2c2nsrRJG6Uy9IK5d0LNspKl0nouI5wf', 'lector', '3e7aa881-45d0-4f62-87b7-5758c50b3a1f', '2026-03-01 00:00:00'),
  ('85f48a79-c715-42a1-ba04-0aa03e8131fd', 'V-56789012', '$2b$10$QR781KYKJV2JoPWZyY5.3d3otlSKH7Uv0JL6e1MOtqLs2opJ6xg', 'lector', '41273021-92dd-4d0d-bc47-357aae133644', '2026-03-01 00:00:00'),
  ('95f59a8a-d826-43b2-cb15-1bb14f9242ae', 'V-67890123', '$2b$10$RS892LZLKW3KpQXaZ6.4e4puvlTLI8Vw1KM7f2NPuruMq3qrK7zh', 'lector', '48f881d7-3946-4ac4-9ede-1de0f7dcaac8', '2026-03-01 00:00:00'),
  ('a5f60a9b-e937-4043-dc26-2cc25a0353bf', 'V-78901234', '$2b$10$ST903MAMLX4LqRYa7.5f5qvwmUMJ9Wy2LN8g3OQvvsNr4stL8ai', 'lector', '69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', '2026-03-01 00:00:00'),
  ('b5f71bac-f048-4154-dc37-3dd36b1464cf', 'E-89012345', '$2b$10$TU014NBNMY5MrSZB8.6g6rxwnVNKa0Xz3MO9h4PRvxOs5tuM9bj', 'editor', '7e42f520-ffaa-4d1f-9f42-c0333f369e41', '2026-03-01 00:00:00'),
  ('c5f82cbd-a159-4265-ca48-4ee47c2575af', 'V-90123456', '$2b$10$UV125OCONZ6NtTC9C7h7ssyxoOLBb1Ya4NP0i5QSvwPt6uvN0ck', 'lector', '8630e71a-b8a4-414c-8ff3-a8059f725a57', '2026-03-01 00:00:00'),
  ('d5f93dce-b260-4376-db59-5ee58d3686cf', 'E-01234567', '$2b$10$VW236PDPPA7OuUD0D8i8tty0pPMCc2Zb5OQ1j6RTwxQt7woP1dl', 'lector', '88b2f5cc-648f-4149-a171-9d1be1599fbd', '2026-03-01 00:00:00');

-- --------------------------------------------------------
-- Exámenes
-- --------------------------------------------------------

INSERT IGNORE INTO `examenes`
  (`id_examen`, `nombre_examen`, `abreviatura_examen`, `area_examen`, `precio_examen`, `tipo_muestra`)
VALUES
  ('EX0001', 'Hematología Completa',      'HEM',  'Hematología',       15.00, 'Sangre Total (EDTA)'),
  ('EX0002', 'Grupo Sanguíneo y Factor Rh','GRU', 'Hematología',       10.00, 'Sangre Total'),
  ('EX0003', 'Glucosa en Ayunas',         'GLU',  'Química Sanguínea',  5.00, 'Suero'),
  ('EX0004', 'Perfil Lipídico',           'LIP',  'Química Sanguínea', 18.00, 'Suero'),
  ('EX0005', 'Creatinina Sérica',         'CRE',  'Química Sanguínea',  8.00, 'Suero'),
  ('EX0006', 'Prueba de Embarazo (HCG)',  'HCG',  'Serología',         10.00, 'Suero / Orina'),
  ('EX0007', 'VDRL (Sífilis)',            'VDRL', 'Serología',          7.00, 'Suero'),
  ('EX0008', 'Perfil Renal',             'PREN',  'Química Sanguínea', 12.00, 'Suero'),
  ('EX0009', 'Perfil Hepático',          'PHEP',  'Química Sanguínea', 25.00, 'Suero'),
  ('EX0010', 'VIH (Anticuerpos)',         'VIH',  'Serología',         15.00, 'Suero'),
  ('EX0011', 'Examen General de Orina',   'EGO',  'Uroanálisis',        8.00, 'Orina'),
  ('EX0012', 'Examen de Heces',           'HEC',  'Coprología',         8.00, 'Heces'),
  ('EX0013', 'Hormona Tiroidea (TSH)',    'TSH',  'Hormonas',          18.00, 'Suero');

-- --------------------------------------------------------
-- Parámetros de examen
-- --------------------------------------------------------

INSERT IGNORE INTO `parametros_examen`
  (`id_parametro`, `abreviatura_examen`, `nombre_parametro`, `unidad_parametro`, `referencia_parametro`, `sexo`)
VALUES
  -- Hematología (HEM)
  (1,  'HEM',  'Hemoglobina',      'g/dL',   '13.5-17.5',       'M'),
  (2,  'HEM',  'Hemoglobina',      'g/dL',   '12.0-16.0',       'F'),
  (3,  'HEM',  'Hematocrito',      '%',      '41-50',           'M'),
  (4,  'HEM',  'Hematocrito',      '%',      '36-44',           'F'),
  (5,  'HEM',  'Leucocitos',       'mm3',    '4500-11000',      'ambos'),
  (6,  'HEM',  'Plaquetas',        'mm3',    '150000-450000',   'ambos'),
  -- Glucosa (GLU)
  (7,  'GLU',  'Glucosa',          'mg/dL',  '70-110',          'ambos'),
  -- Perfil Lipídico (LIP)
  (8,  'LIP',  'Colesterol Total', 'mg/dL',  '0-200',           'ambos'),
  (9,  'LIP',  'Triglicéridos',    'mg/dL',  '0-150',           'ambos'),
  (10, 'LIP',  'HDL',              'mg/dL',  '40-60',           'ambos'),
  -- Creatinina (CRE)
  (11, 'CRE',  'Creatinina',       'mg/dL',  '0.7-1.3',         'M'),
  (12, 'CRE',  'Creatinina',       'mg/dL',  '0.6-1.1',         'F'),
  -- VDRL
  (13, 'VDRL', 'Resultado',        'Dilución','No Reactivo',    'ambos'),
  -- Perfil Renal (PREN)
  (14, 'PREN', 'Urea',             'mg/dL',  '15-45',           'ambos'),
  (15, 'PREN', 'Creatinina',       'mg/dL',  '0.7-1.3',         'M'),
  (16, 'PREN', 'Creatinina',       'mg/dL',  '0.6-1.1',         'F'),
  -- Perfil Hepático (PHEP)
  (17, 'PHEP', 'TGP (ALAT)',       'U/L',    '0-41',            'ambos'),
  (18, 'PHEP', 'TGO (ASAT)',       'U/L',    '0-40',            'ambos'),
  (19, 'PHEP', 'Bilirrubina Total','mg/dL',  '0.1-1.2',         'ambos'),
  -- VIH
  (20, 'VIH',  'Resultado',        'S/CO',   'No Reactivo',     'ambos'),
  -- EGO
  (21, 'EGO',  'Color',            'Texto',  'Amarillo',        'ambos'),
  (22, 'EGO',  'Proteínas',        'mg/dL',  '0-30',            'ambos'),
  (23, 'EGO',  'Glucosa',          'mg/dL',  '0-0.8',           'ambos'),
  -- TSH
  (24, 'TSH',  'TSH',              'uIU/mL', '0.4-4.2',         'ambos'),
  -- Grupo Sanguíneo (GRU)
  (25, 'GRU',  'Grupo',            'Texto',  'A/B/AB/O',        'ambos'),
  (26, 'GRU',  'Factor Rh',        'Texto',  'Positivo/Negativo','ambos');

-- --------------------------------------------------------
-- Pacientes
-- --------------------------------------------------------

INSERT IGNORE INTO `pacientes`
  (`id_paciente`, `cedula_paciente`, `nombre_paciente`, `apellido_paciente`,
   `sexo_paciente`, `fecha_nacimiento`, `telefono_paciente`, `email_paciente`,
   `direccion_paciente`, `fecha_registro`)
VALUES
  ('22eef8d4-9895-4921-b18f-c1418cea1afe', 'V-12345678', 'Patricia', 'Herrera', 'F', '1981-12-12', '0412-2228833', 'p.herrera@email.com',   'Av. Principal, Caracas',          '2026-03-01 00:00:00'),
  ('2f92a03a-6954-4994-b0f9-f5aee1454448', 'V-23456789', 'Sofía',    'Torres',  'F', '1994-04-18', '0412-6663344', 'sofia.torres@email.com','Urb. Prebo, Valencia',            '2026-03-01 00:00:00'),
  ('34399f57-52eb-451a-ba22-bc1dc409099f', 'V-34567890', 'Miguel',   'Ángel',   'M', '1975-07-07', '0414-1234567', 'mangel.75@email.com',   'Barrio Obrero, San Cristóbal',    '2026-03-01 00:00:00'),
  ('751c839b-d8f0-41eb-bdaa-4ba6803934fd', 'V-45678901', 'Ana',      'López',   'F', '1983-01-09', '0416-8887711', 'alopez@email.com',      'Av. Las Américas, Mérida',       '2026-03-01 00:00:00'),
  ('7b052e9a-fc1f-413b-bd51-362b9b4db844', 'V-56789012', 'Paula',    'Vargas',  'F', '1984-09-21', '0414-0001122', 'pvargas@email.com',     'Urb. El Rosal, Caracas',          '2026-03-01 00:00:00'),
  ('a436da91-1445-4335-b9ae-08067cbd3525', 'V-67890123', 'John',     'Smith',   'M', '1978-02-15', '0414-3334455', 'jsmith@email.com',      'Res. El Bosque, Caracas',         '2026-03-01 00:00:00'),
  ('a7a306d7-da82-425a-b1a3-4fa44d7c67ac', 'V-78901234', 'Roberto',  'García',  'M', '1965-11-22', '0212-3331122', 'rgarcia@email.com',     'El Cafetal, Caracas',             '2026-03-01 00:00:00'),
  ('c9934691-6aad-4715-8f6b-bd5e860492a9', 'V-89012345', 'Jorge',    'Blanco',  'M', '1995-05-05', '0414-7774411', 'jblanco@email.com',     'Urb. El Parral, Valencia',        '2026-03-01 00:00:00'),
  ('cbfd3b3d-f5a0-4931-b8c3-db949a8c3d26', 'V-90123456', 'Carlos',   'Duarte',  'M', '1988-02-28', '0416-5550011', 'cduarte@email.com',     'Bello Monte, Caracas',            '2026-03-01 00:00:00'),
  ('cd3d41de-6354-49a7-9414-8a9adb25c4bc', 'E-01234567', 'Elena',    'Salazar', 'F', '1991-08-20', '0424-1110022', 'esalazar@email.com',    'Lechería, Anzoátegui',            '2026-03-01 00:00:00');

-- --------------------------------------------------------
-- Órdenes de servicio
-- Nota: cedula_paciente y cedula_empleado son strings (cédulas),
--       no UUIDs — las FK referencian los campos de cédula únicos.
-- --------------------------------------------------------

INSERT IGNORE INTO `ordenes_servicio`
  (`id_orden`, `cedula_paciente`, `cedula_empleado`, `monto_total`, `estado_pago`, `fecha_orden`)
VALUES
  (1,  'V-12345678', 'V-12345678', 12.00, 'Pagado',   '2026-03-01 10:00:00'),
  (2,  'V-23456789', 'V-22345678', 27.00, 'Pagado',   '2026-03-02 11:30:00'),
  (3,  'V-34567890', 'V-23456789', 40.00, 'Pendiente','2026-03-03 14:15:00'),
  (4,  'V-45678901', 'V-34567890', 13.00, 'Pagado',   '2026-03-04 09:20:00'),
  (5,  'V-56789012', 'V-45678901', 23.00, 'Pendiente','2026-03-05 16:45:00'),
  (6,  'V-67890123', 'V-56789012', 15.00, 'Pagado',   '2026-03-06 08:30:00'),
  (7,  'V-78901234', 'V-67890123', 17.00, 'Pagado',   '2026-03-07 12:00:00'),
  (8,  'V-89012345', 'V-78901234', 22.00, 'Pendiente','2026-03-08 15:20:00'),
  (9,  'V-90123456', 'V-89012345', 15.00, 'Pagado',   '2026-03-09 10:10:00'),
  (10, 'E-01234567', 'V-90123456',  8.00, 'Pendiente','2026-03-10 13:50:00');

-- --------------------------------------------------------
-- Detalle de órdenes
-- --------------------------------------------------------

INSERT IGNORE INTO `detalle_orden`
  (`id_detalle`, `id_orden`, `abreviatura_examen`, `precio_historico`)
VALUES
  (1,  1,  'GLU',  5.00),
  (2,  1,  'VDRL', 7.00),
  (3,  2,  'HEM',  15.00),
  (4,  2,  'GLU',  5.00),
  (5,  2,  'VDRL', 7.00),
  (6,  3,  'HEM',  15.00),
  (7,  3,  'PHEP', 25.00),
  (8,  4,  'EGO',  8.00),
  (9,  4,  'GLU',  5.00),
  (10, 5,  'TSH',  18.00),
  (11, 5,  'GLU',  5.00),
  (12, 6,  'HEM',  15.00),
  (13, 7,  'PREN', 12.00),
  (14, 7,  'GLU',  5.00),
  (15, 8,  'VIH',  15.00),
  (16, 8,  'VDRL', 7.00),
  (17, 9,  'HEM',  15.00),
  (18, 10, 'EGO',  8.00);

-- --------------------------------------------------------
-- Resultados de exámenes
-- --------------------------------------------------------

INSERT IGNORE INTO `resultado_examenes`
  (`id_resultado`, `id_detalle`, `cedula_empleado`, `valores_resultados`, `observaciones`, `fecha_finalizacion`)
VALUES
  (1, 1,  'V-12345678',
   '[{"nombre":"Glucosa","valor":"150","unidad":"mg/dL","referencia":"70-110","estado":"alto"}]',
   'Paciente con historial de glucosa alta',
   '2026-03-01 14:30:00'),

  (2, 3,  'V-22345678',
   '[{"nombre":"Hemoglobina","valor":"14.5","unidad":"g/dL","referencia":"13.5-17.5","estado":"normal"},{"nombre":"Hematocrito","valor":"45","unidad":"%","referencia":"41-50","estado":"normal"}]',
   'Resultados dentro de rangos normales',
   '2026-03-02 16:00:00'),

  (3, 6,  'V-23456789',
   '[{"nombre":"Hemoglobina","valor":"11.5","unidad":"g/dL","referencia":"12.0-16.0","estado":"bajo"}]',
   'Posible anemia, se recomienda complementar estudios',
   '2026-03-06 11:20:00');

COMMIT;
