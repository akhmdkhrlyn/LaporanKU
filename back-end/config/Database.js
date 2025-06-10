import { Sequelize } from "sequelize";

const db = new Sequelize('report_app','root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;

// const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");

// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// // Uji koneksi (opsional, tapi bagus untuk debugging awal)
// pool.getConnection().then((connection) => {
//     console.log("Berhasil terhubung ke database MySQL!");
//     connection.release();
// })
// .catch((err) => {
//     console.error("Gagal terhubung ke database:", err.stack);
// });

// module.exports = pool;
