const dotEnv = require("dotenv");
const bcrypt = require("bcrypt");
const fs = require("fs");
dotEnv.config();

const mysql = require("mysql");

//elige cual migracion ejecurtar
const args = process.argv.slice(2);
const isDemo = args.includes("demo");

const archivoSQL = isDemo 
  ? `${__dirname}\\administrador-laboratorio.sql` 
  : `${__dirname}\\administrador-laboratorio-vacia.sql`;

const nombreMigration = isDemo ? "Datos de ejemplo" : "Estructura";

console.log(` Ejecutando migración: ${nombreMigration}\n`);

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

connection.connect();

const crearBD = async () => {
  const archivo = fs.readFileSync(archivoSQL, "utf-8");
  const query = archivo;
  return new Promise((resolve, reject) => {
    connection.query(query, (err) => {
      if (err) reject(err);
      console.log(`Base de datos creada: ${nombreMigration}`);
      connection.end();
    });
  });
};

crearBD()
  .then(() => {
    console.log("Migración completada exitosamente!");
  })
  .catch((err) => {
    console.error("Error en migración:", err.message);
    connection.end();
    process.exit(1);
  });