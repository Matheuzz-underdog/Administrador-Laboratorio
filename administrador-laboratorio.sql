-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2026 a las 16:52:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `administrador-laboratorio`
--
CREATE DATABASE IF NOT EXISTS `administrador-laboratorio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `administrador-laboratorio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_orden`
--

CREATE TABLE IF NOT EXISTS `detalle_orden` (
  `id_detalle` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `abreviatura_examen` varchar(6) NOT NULL,
  `precio_historico` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_orden`
--

INSERT IGNORE INTO `detalle_orden` (`id_detalle`, `id_orden`, `abreviatura_examen`, `precio_historico`) VALUES
(2, 11, 'GLU', 5.00),
(3, 11, 'VDRL', 7.00),
(4, 12, 'HEM', 15.00),
(5, 12, 'GLU', 5.00),
(6, 12, 'VDRL', 7.00),
(11, 14, 'PHEP', 25.00),
(16, 17, 'EGO', 8.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE IF NOT EXISTS `empleados` (
  `id_empleado` char(36) NOT NULL,
  `cedula_empleado` varchar(15) NOT NULL,
  `nombre_empleado` varchar(100) NOT NULL,
  `apellido_empleado` varchar(100) NOT NULL,
  `cargo_empleado` varchar(100) NOT NULL,
  `telefono_empleado` varchar(20) NOT NULL,
  `email_empleado` varchar(255) NOT NULL,
  `actividad_empleado` tinyint(1) NOT NULL,
  `datos_profesionales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_profesionales`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT IGNORE INTO `empleados` (`id_empleado`, `cedula_empleado`, `nombre_empleado`, `apellido_empleado`, `cargo_empleado`, `telefono_empleado`, `email_empleado`, `actividad_empleado`, `datos_profesionales`) VALUES
('16a793d9-c8c2-4004-b001-b3333b464ea3', 'V-12345678', 'Carlos', 'Mendoza', 'Bioanalista Principal', '0412-5551234', 'c.mendoza@lab.com', 1, '{"especialidad":"Hematología y Coagulación","colegiado":"HB-9921","nivel_academico":"Postgrado"}'),
('223bc5c6-929a-4fb4-8733-b17692fd91d0', 'V-13444555', 'Julia', 'Blanco', 'Bioanalista de Citología', '0424-1112233', 'j.blanco@lab.com', 1, '{"especialidad":"Citopatología","colegiado":"CB-8812"}'),
('2bd382f5-dea8-4da3-b903-75f3c2096055', 'V-20111222', 'Luis', 'García', 'Recepcionista Médico', '0414-9991122', 'l.garcia@lab.com', 1, NULL),
('3e7aa881-45d0-4f62-87b7-5758c50b3a1f', 'V-25666777', 'Mónica', 'Díaz', 'Asistente de Laboratorio', '0412-0001122', 'm.diaz@lab.com', 1, NULL),
('41273021-92dd-4d0d-bc47-357aae133644', 'V-30111000', 'Gabriel', 'Suárez', 'Auxiliar de Almacén', '0412-3330011', 'g.suarez@lab.com', 1, NULL),
('48f881d7-3946-4ac4-9ede-1de0f7dcaac8', 'V-22333444', 'Jorge', 'Peña', 'Mensajero Motorizado', '0416-1234567', 'j.pena@lab.com', 1, NULL),
('69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', 'V-24555666', 'Andrés', 'Castro', 'Analista de Sistemas Lab', '0416-8887766', 'a.castro@lab.com', 1, '{"certificacion":"Administración de Bases de Datos","software":"LIMS Pro"}'),
('7e42f520-ffaa-4d1f-9f42-c0333f369e41', 'E-16777888', 'Patricia', 'Vargas', 'Especialista en Virología', '0414-6667788', 'p.vargas@lab.com', 1, '{"especialidad":"PCR y Biología Molecular","laboratorio_referencia":"Instituto de Higiene"}'),
('8630e71a-b8a4-414c-8ff3-a8059f725a57', 'V-28999000', 'Paola', 'Rivas', 'Pasante de Bioanálisis', '0412-9998877', 'p.rivas@lab.com', 1, '{"universidad":"ULA","proyecto":"Pruebas de Dengue"}'),
('88b2f5cc-648f-4149-a171-9d1be1599fbd', 'E-15777888', 'Ana', 'Martínez', 'Especialista en Microbiología', '0412-8884433', 'a.martinez@lab.com', 1, '{"especialidad":"Bacteriología","colegiado":"MB-4432"}'),
('a77e576a-4ec5-443c-a6bc-be8f340710d0', 'E-84561230', 'Elena', 'Rodríguez', 'Técnico de Laboratorio', '0424-5556789', 'e.rodriguez@lab.com', 1, '{"especialidad":"Extracción de Muestras Pediátricas","turno":"Diurno"}'),
('a8ac6304-d56c-4d1f-a48c-23b9f6bc9408', 'V-11888999', 'Roberto', 'Sánchez', 'Gerente de Operaciones', '0212-3334455', 'r.sanchez@lab.com', 1, '{"postgrado":"Gerencia de Salud","certificacion":"ISO 9001:2015"}'),
('c83cfb04-40cc-41bb-a615-b3a00bce1423', 'V-14222333', 'Ricardo', 'Torres', 'Mantenimiento y Equipos', '0414-2223344', 'r.torres@lab.com', 1, '{"tecnico":"Electromedicina","especialidad":"Calibración de Equipos"}'),
('c975a4a1-5e62-45f3-b2d8-d01265eb532c', 'V-21444555', 'Ana', 'Sol', 'Especialista en Endocrinología', '0412-7773344', 'b.luna@lab.com', 1, NULL),
('d2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', 'V-32084066', 'Mateo', 'Cuevas', 'Bioanalista de Guardia', '0424-7778899', 'm.lopez@lab.com', 1, '{"especialidad":"nada","colegiado":"SB-1102"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE IF NOT EXISTS `examenes` (
  `id_examen` varchar(6) NOT NULL,
  `nombre_examen` varchar(100) NOT NULL,
  `abreviatura_examen` char(4) NOT NULL,
  `area_examen` varchar(100) NOT NULL,
  `precio_examen` decimal(10,2) NOT NULL,
  `tipo_muestra` varchar(100) NOT NULL,
  `parametros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`parametros`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT IGNORE INTO `examenes` (`id_examen`, `nombre_examen`, `abreviatura_examen`, `area_examen`, `precio_examen`, `tipo_muestra`, `parametros`) VALUES
('EX0001', 'Hematología Completa', 'HEM', 'Hematología', 15.00, 'Sangre Total (EDTA)', '[{"nombre":"Hemoglobina","unidad":"g/dL","referencia":{"M":[13.5,17.5],"F":[12,16]}},{"nombre":"Hematocrito","unidad":"%","referencia":{"M":[41,50],"F":[36,44]}},{"nombre":"Leucocitos","unidad":"mm3","referencia":{"general":[4500,11000]}},{"nombre":"Plaquetas","unidad":"mm3","referencia":{"general":[150000,450000]}}]'),
('EX0002', 'Grupo Sanguíneo y Factor Rh', 'GRU', 'Hematología', 10.00, 'Sangre Total', '[{"nombre":"Grupo","unidad":"Texto","referencia":{"tipo":"cualitativo"}},{"nombre":"Factor Rh","unidad":"Texto","referencia":{"tipo":"cualitativo"}}]'),
('EX0003', 'Glucosa en Ayunas', 'GLU', 'Química Sanguínea', 5.00, 'Suero', '[{"nombre":"Glucosa","unidad":"mg/dL","referencia":{"general":[70,110]}}]'),
('EX0006', 'Prueba de Embarazo (HCG)', 'HCG', 'Serología', 10.00, 'Suero / Orina', '[{"nombre":"HCG","unidad":"mIU/mL","referencia":{"tipo":"cualitativo","notas":"Positivo/Negativo"}}]'),
('EX0007', 'VDRL (Sífilis)', 'VDRL', 'Serología', 7.00, 'Suero', '[{"nombre":"Resultado","unidad":"Dilución","referencia":{"tipo":"cualitativo","notas":"No Reactivo"}}]'),
('EX0008', 'Perfil Renal (Urea y Creatinina)', 'PREN', 'Química Sanguínea', 12.00, 'Suero', '[{"nombre":"Urea","unidad":"mg/dL","referencia":{"general":[15,45]}},{"nombre":"Creatinina","unidad":"mg/dL","referencia":{"M":[0.7,1.3],"F":[0.6,1.1]}}]'),
('EX0009', 'Perfil Hepático', 'PHEP', 'Química Sanguínea', 25.00, 'Suero', '[{"nombre":"TGP (ALAT)","unidad":"U/L","referencia":{"general":[0,41]}},{"nombre":"TGO (ASAT)","unidad":"U/L","referencia":{"general":[0,40]}},{"nombre":"Bilirrubina Total","unidad":"mg/dL","referencia":{"general":[0.1,1.2]}}]'),
('EX0010', 'VIH (Anticuerpos)', 'VIH', 'Serología', 15.00, 'Suero', '[{"nombre":"Resultado","unidad":"S/CO","referencia":{"tipo":"cualitativo","notas":"No Reactivo"}}]'),
('EX0011', 'Examen General de Orina', 'EGO', 'Uroanálisis', 8.00, 'Orina', '[{"nombre":"Color","unidad":"Texto","referencia":{"tipo":"cualitativo"}},{"nombre":"Aspecto","unidad":"Texto","referencia":{"tipo":"cualitativo"}},{"nombre":"Proteínas","unidad":"mg/dL","referencia":{"general":[0,30]}},{"nombre":"Glucosa (Orina)","unidad":"mg/dL","referencia":{"general":[0,0.8]}}]'),
('EX0012', 'Examen de Heces', 'HEC', 'Coprología', 8.00, 'Heces', '[{"nombre":"Consistencia","unidad":"Texto","referencia":{"tipo":"cualitativo"}},{"nombre":"Parásitos","unidad":"Texto","referencia":{"tipo":"cualitativo","notas":"No se observan"}}]'),
('EX0013', 'Hormona Tiroidea (TSH)', 'TSH', 'Hormonas', 18.00, 'Suero', '[{"nombre":"TSH","unidad":"uIU/mL","referencia":{"general":[0.4,4.2]}}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_servicio`
--

CREATE TABLE IF NOT EXISTS `ordenes_servicio` (
  `id_orden` int(11) NOT NULL,
  `cedula_paciente` char(36) NOT NULL,
  `cedula_empleado` char(36) NOT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  `estado_pago` enum('Pendiente','Pagado') NOT NULL,
  `fecha_orden` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ordenes_servicio`
--

INSERT IGNORE INTO `ordenes_servicio` (`id_orden`, `cedula_paciente`, `cedula_empleado`, `monto_total`, `estado_pago`, `fecha_orden`) VALUES
(11, 'V-30111222', 'V-12345678', 12.00, 'Pagado', '2026-03-03 13:28:40'),
(12, 'V-13111222', 'V-25666777', 27.00, 'Pendiente', '2026-03-06 11:11:18'),
(14, 'V-28555444', 'E-15777888', 25.00, 'Pagado', '2026-03-06 11:16:48'),
(17, 'E-15999000', 'E-84561230', 8.00, 'Pendiente', '2026-03-06 11:30:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE IF NOT EXISTS `pacientes` (
  `id_paciente` char(36) NOT NULL,
  `cedula_paciente` varchar(15) NOT NULL,
  `nombre_paciente` varchar(100) NOT NULL,
  `apellido_paciente` varchar(100) NOT NULL,
  `sexo_paciente` char(1) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono_paciente` varchar(20) NOT NULL,
  `email_paciente` varchar(255) NOT NULL,
  `direccion_paciente` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT IGNORE INTO `pacientes` (`id_paciente`, `cedula_paciente`, `nombre_paciente`, `apellido_paciente`, `sexo_paciente`, `fecha_nacimiento`, `telefono_paciente`, `email_paciente`, `direccion_paciente`, `fecha_registro`) VALUES
('22eef8d4-9895-4921-b18f-c1418cea1afe', 'V-16444333', 'Patricia', 'Herrera', 'F', '1981-12-12', '0412-2228833', 'p.herrera@email.com', 'Av. Intercomunal, Sector El Remanso, Barcelona', '2026-03-02 00:34:25'),
('2f92a03a-6954-4994-b0f9-f5aee1454448', 'V-22444555', 'Sofía', 'Torres', 'F', '1994-04-18', '0412-6663344', 'sofia.torres@email.com', 'Urb. Prebo, Calle 110, Valencia', '2026-03-02 00:32:47'),
('34399f57-52eb-451a-ba22-bc1dc409099f', 'V-13111222', 'Miguel', 'Ángel', 'M', '1975-07-07', '0414-1234567', 'mangel.75@email.com', 'Barrio Obrero, Carrera 15, San Cristóbal', '2026-03-02 00:34:04'),
('751c839b-d8f0-41eb-bdaa-4ba6803934fd', 'E-15999000', 'Ana', 'López', 'F', '1983-01-09', '0416-8887711', 'alopez.bio@email.com', 'Av. Las Américas, Res. Humboldt, Mérida', '2026-03-02 00:32:30'),
('7b052e9a-fc1f-413b-bd51-362b9b4db844', 'V-15666777', 'Paula', 'Vargas', 'F', '1984-09-21', '0414-0001122', 'pvargas.84@email.com', 'Urb. El Rosal, Edif. Galipán, Caracas', '2026-03-02 00:35:07'),
('a436da91-1445-4335-b9ae-08067cbd3525', 'E-82111000', 'John', 'Smith', 'M', '1978-02-15', '0414-3334455', 'jsmith.lab@email.com', 'Res. El Bosque, Apto 4-B, Chacao, Caracas', '2026-03-02 00:32:00'),
('a7a306d7-da82-425a-b1a3-4fa44d7c67ac', 'V-09888777', 'Roberto', 'García', 'M', '1965-11-22', '0212-3331122', 'r.garcia.p@email.com', 'El Cafetal, Calle Santa Ana, Caracas', '2026-03-02 00:32:40'),
('c9934691-6aad-4715-8f6b-bd5e860492a9', 'V-24111000', 'Jorge', 'Blanco', 'M', '1995-05-05', '0414-7774411', 'jorge.blanco@email.com', 'Urb. El Parral, Av. Los Próceres, Valencia', '2026-03-02 00:34:32'),
('cbfd3b3d-f5a0-4931-b8c3-db949a8c3d26', 'E-21555666', 'Carlos', 'Duarte', 'M', '1988-02-28', '0416-5550011', 'cduarte88@email.com', 'Colinas de Bello Monte, Calle Orinoco, Caracas', '2026-03-02 00:34:19'),
('cd3d41de-6354-49a7-9414-8a9adb25c4bc', 'V-19888777', 'Elena', 'Salazar', 'F', '1991-08-20', '0424-1110022', 'e.salazar91@email.com', 'Lechería, Res. Puerto Príncipe, Anzoátegui', '2026-03-02 00:34:39'),
('d504c0d4-db94-4b2f-9f4e-7dc1cb24c8ec', 'V-08222111', 'Ramón', 'Díaz', 'M', '1960-01-01', '0212-4445566', 'ramon.diaz@email.com', 'Urb. Montalbán II, Calle 4, Caracas', '2026-03-02 00:34:48'),
('d8dcd868-52ac-4c3f-a315-fb4c7d995a3e', 'V-28555444', 'Lucía', 'Gómez', 'F', '2000-03-15', '0412-3336699', 'lucia.gomez@email.com', 'Sector Juana de Ávila, Av. Paoli, Maracaibo', '2026-03-02 00:34:55'),
('dd2b8593-5d14-4c62-80d5-541f780defcc', 'V-18777888', 'Valentina', 'Castillo', 'F', '1989-08-03', '0416-7771122', 'valen.casti@email.com', 'Calle Hambre, Sector Corito, Maracaibo', '2026-03-02 00:32:07'),
('e4f79b9a-fd06-41c8-b7a4-2eaedcfddcbf', 'V-21333222', 'Andrés', 'Morales', 'M', '1993-11-11', '0416-9995544', 'a.morales.m@email.com', 'Urb. Base Aragua, Calle 2, Maracay', '2026-03-02 00:35:01'),
('eb8a961d-0f0e-4794-a4e4-e985e4bc6f72', 'V-14555666', 'Ricardo', 'Guzmán', 'M', '1985-05-12', '0412-1112233', 'r.guzman@email.com', 'Av. Bolivar, Edif. Centro, Piso 2, Valencia', '2026-03-02 00:28:13'),
('efda99e9-5e0f-435d-8c6c-fc2114b3d225', 'V-27888999', 'Isabella', 'Martínez', 'F', '1999-09-09', '0424-9998877', 'isa.mtz@email.com', 'Urb. La Trigaleña, Res. Platinum, Valencia', '2026-03-02 00:34:12'),
('f05e3a5d-c718-4745-b14b-45e36f2264e6', 'V-30111222', 'Gabriel', 'Rojas', 'M', '2002-06-14', '0414-2223399', 'gabriel.rojas@email.com', 'Sector Tierra Negra, Calle 72, Maracaibo', '2026-03-02 00:32:25'),
('f19828bf-44b2-40d1-b268-6931683c11b6', 'V-20123456', 'Claudia', 'Pérez', 'F', '1992-10-25', '0424-5558899', 'm.perez92@email.com', 'Urb. La Viña, Calle 3, Casa 10, Maracay', '2026-03-02 00:31:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_examenes`
--

CREATE TABLE IF NOT EXISTS `resultado_examenes` (
  `id_resultado` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL,
  `cedula_empleado` char(36) NOT NULL,
  `valores_resultados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`valores_resultados`)),
  `observaciones` text NOT NULL,
  `fecha_finalizacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `resultado_examenes`
--

INSERT IGNORE INTO `resultado_examenes` (`id_resultado`, `id_detalle`, `cedula_empleado`, `valores_resultados`, `observaciones`, `fecha_finalizacion`) VALUES
(1, 2, 'V-28999000', '[{"nombre":"Glucosa","valor":"150mg/dL","referencia":{"general":[70,110]}}]', 'Ninguna', '2026-03-10 14:54:30'),
(3, 4, 'V-28999000', '[{"nombre":"Hemoglobina","valor":"100g/dL","referencia":{"M":[13.5,17.5],"F":[12,16]}},{"nombre":"Hematocrito","valor":"23%","referencia":{"M":[41,50],"F":[36,44]}},{"nombre":"Leucocitos","valor":"5000mm3","referencia":{"general":[4500,11000]}},{"nombre":"Plaquetas","valor":"80000mm3","referencia":{"general":[150000,450000]}}]', 'Creo que algo no esta bien', '2026-03-15 10:36:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` char(36) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nivel_cuenta` enum('lector','editor','admin') NOT NULL DEFAULT 'lector',
  `id_empleado` char(36) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT IGNORE INTO `usuarios` (`id_usuario`, `cedula`, `password`, `nivel_cuenta`, `id_empleado`, `fecha_registro`) VALUES
('45f04a35-e361-48c7-ae60-6cc59a4679cb', 'V-24555666', '$2b$10$LM347EUTRGVyFlUtsyVv1.uzykOEP4SwF6HH2a7KLunGc6bq2G2yu', 'lector', '69dc501d-b3a1-4096-9ae7-6ca1e3c7d422', '2026-03-10 23:30:31'),
('d2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', 'V-32084066', '$2b$10$tRDod6swdl1PS0b61YUg1O8Yr4M7rCPlZ.nosADPN1hTgNPlvoXF6', 'admin', 'd2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', '2026-03-07 17:20:52');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;