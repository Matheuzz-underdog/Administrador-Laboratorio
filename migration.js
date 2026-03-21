const dotEnv = require("dotenv");
const bcrypt = require("bcrypt");
const fs = require("fs");
dotEnv.config();

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

connection.connect();

const directorio = `${__dirname}\\administrador-laboratorio.sql`;

const crearBD = async () => {
  const archivo = fs.readFileSync(directorio, "utf-8");
  const query = archivo;
  return new Promise((resolve, reject) => {
    connection.query(query, (err) => {
      if (err) reject(err);
      console.log("BASE DE DATOS CREADA")
    });
  });
};
crearBD();

connection.end();