-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2026 a las 17:51:51
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

CREATE TABLE `detalle_orden` (
  `id_detalle` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `abreviatura_examen` varchar(6) NOT NULL,
  `precio_historico` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id_examen` varchar(6) NOT NULL,
  `nombre_examen` varchar(100) NOT NULL,
  `abreviatura_examen` char(4) NOT NULL,
  `area_examen` varchar(100) NOT NULL,
  `precio_examen` decimal(10,2) NOT NULL,
  `tipo_muestra` varchar(100) NOT NULL,
  `parametros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`parametros`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_servicio`
--

CREATE TABLE `ordenes_servicio` (
  `id_orden` int(11) NOT NULL,
  `cedula_paciente` char(36) NOT NULL,
  `cedula_empleado` char(36) NOT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  `estado_pago` enum('Pendiente','Pagado') NOT NULL,
  `fecha_orden` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_examenes`
--

CREATE TABLE `resultado_examenes` (
  `id_resultado` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL,
  `cedula_empleado` char(36) NOT NULL,
  `valores_resultados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`valores_resultados`)),
  `observaciones` text NOT NULL,
  `fecha_finalizacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` char(36) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nivel_cuenta` enum('lector','editor','admin') NOT NULL DEFAULT 'lector',
  `id_empleado` char(36) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_detalle_orden` (`id_orden`),
  ADD KEY `fk_detalle_examen` (`abreviatura_examen`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `uq_cedula_empleado` (`cedula_empleado`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id_examen`),
  ADD UNIQUE KEY `uq_nombre_examen` (`nombre_examen`),
  ADD UNIQUE KEY `uq_abreviatura_examen` (`abreviatura_examen`);

--
-- Indices de la tabla `ordenes_servicio`
--
ALTER TABLE `ordenes_servicio`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `fk_paciente_a_orden` (`cedula_paciente`),
  ADD KEY `fk_empleado_a_orden` (`cedula_empleado`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD UNIQUE KEY `uq_cedula_paciente` (`cedula_paciente`),
  ADD UNIQUE KEY `uq_email_paciente` (`email_paciente`);

--
-- Indices de la tabla `resultado_examenes`
--
ALTER TABLE `resultado_examenes`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `fk_resultado_detalle` (`id_detalle`),
  ADD KEY `fk_resultado_empleado` (`cedula_empleado`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uq_username` (`cedula`),
  ADD KEY `fk_usuarios_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ordenes_servicio`
--
ALTER TABLE `ordenes_servicio`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resultado_examenes`
--
ALTER TABLE `resultado_examenes`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  ADD CONSTRAINT `detalle_orden_ibfk_1` FOREIGN KEY (`abreviatura_examen`) REFERENCES `examenes` (`abreviatura_examen`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_servicio` (`id_orden`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ordenes_servicio`
--
ALTER TABLE `ordenes_servicio`
  ADD CONSTRAINT `ordenes_servicio_ibfk_1` FOREIGN KEY (`cedula_paciente`) REFERENCES `pacientes` (`cedula_paciente`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ordenes_servicio_ibfk_2` FOREIGN KEY (`cedula_empleado`) REFERENCES `empleados` (`cedula_empleado`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `resultado_examenes`
--
ALTER TABLE `resultado_examenes`
  ADD CONSTRAINT `fk_resultado_detalle` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_orden` (`id_detalle`),
  ADD CONSTRAINT `fk_resultado_empleado` FOREIGN KEY (`cedula_empleado`) REFERENCES `empleados` (`cedula_empleado`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE;

-- --------------------------------------------------------

--
-- Datos de prueba: Empleado y Usuario Admin
--

INSERT INTO `empleados` (`id_empleado`, `cedula_empleado`, `nombre_empleado`, `apellido_empleado`, `cargo_empleado`, `telefono_empleado`, `email_empleado`, `actividad_empleado`, `datos_profesionales`) VALUES
('d2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', 'V-12345678', 'Admin', 'Principal', 'Administrador', '0412-1234567', 'admin@lab.com', 1, '{"cargo":"admin","departamento":"Sistemas"}');

INSERT INTO `usuarios` (`id_usuario`, `cedula`, `password`, `nivel_cuenta`, `id_empleado`, `fecha_registro`) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'V-12345678', '$2b$10$0tSgXBbdHGBJEAR6MC4pT.sZKPoEuu9N4s17FR9pCSKL4rmslysty', 'admin', 'd2fdf9bb-13f2-4e52-9ca3-e0d472ebe5f6', '2026-03-23 12:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
