const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
dotEnv.config();

const args = process.argv.slice(2);
const isDemo = args.includes("demo");
const DB_NAME = process.env.DB_NAME || "administrador-laboratorio";

const archivoSQL = isDemo
  ? path.join(__dirname, "administrador-laboratorio.sql")
  : path.join(__dirname, "administrador-laboratorio-vacia.sql");

const nombreMigration = isDemo ? "Datos de ejemplo (seed)" : "Estructura vacía";

const validarEstructura = () => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host:     process.env.DB_HOST,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    conn.connect((err) => {
      if (err) {
        return reject(new Error(
          "No se pudo conectar a MySQL. Asegurate de que XAMPP esté corriendo."
        ));
      }

      conn.query("SHOW DATABASES", (err, results) => {
        conn.end();
        if (err) return reject(err);

        const existe = results.map((r) => Object.values(r)[0]).includes(DB_NAME);

        if (existe) {
          return reject(new Error(
            `La base de datos "${DB_NAME}" ya existe` +
            "Si la reinstalás los datos se corromperán" +
            "Para continuar:\n" +
            "  1. Abrí phpMyAdmin en http://localhost/phpmyadmin" +
            `  2. Eliminá la base de datos "${DB_NAME}" o cambiá el nombre en las variables de entorno` +
            "  3. Volvé a ejecutar la migración"
          ));
        }

        resolve();
      });
    });
  });
};

const validarSeed = () => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host:     process.env.DB_HOST,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: DB_NAME,
    });

    conn.connect((err) => {
      if (err) {
        return reject(new Error(
          `Eror al conectar con "${DB_NAME}"` 
        ));
      }

      //si existe mas de un empleado la seed ya no funcionaria
      conn.query("SELECT COUNT(*) AS total FROM `empleados`", (err, results) => {
        conn.end();
        if (err) return reject(err);

        const total = results[0].total;

        if (total > 1) {
          return reject(new Error(
            "La seed de datos de ejemplo ya fue cargada anteriormente o tiene datos que ingreso manualmente" +
            `Se recomienda que limpie la base de datos para no duplicar datos` 
          ));
        }

        resolve();
      });
    });
  });
};

const migrar = () => {
  return new Promise((resolve, reject) => {
    const connConfig = {
      host:               process.env.DB_HOST,
      user:               process.env.DB_USER,
      password:           process.env.DB_PASSWORD,
      multipleStatements: true,
    };

    // Para la seed ya sabemos que la BD existe, la seleccionamos directamente
    if (isDemo) {
      connConfig.database = DB_NAME;
    }

    const conn = mysql.createConnection(connConfig);

    conn.connect((err) => {
      if (err) return reject(err);

      const sql = fs.readFileSync(archivoSQL, "utf-8");

      conn.query(sql, (err) => {
        conn.end();
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

console.log(`\nEjecutando migración: ${nombreMigration}\n`);

const validar = isDemo ? validarSeed : validarEstructura;

validar()
  .then(() => migrar())
  .then(() => {
    if (isDemo) {
      console.log("Se ingresaron datos de ejemplo correctamente");
    } else {
      console.log("¡Estructura creada exitosamente!");
    }
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });