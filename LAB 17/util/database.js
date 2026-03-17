// Lab 17 - A01713207 Oscar Alexander Vilchis Soto
// util/database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cartelera',
    password: '',
});

module.exports = pool.promise();