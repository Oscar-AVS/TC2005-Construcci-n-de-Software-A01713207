// Lab 19 - A01713207 Oscar Alexander Vilchis Soto
// models/user.js
const db     = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {

    constructor(mi_username, mi_password, mi_nombre) {
        this.username = mi_username;
        this.password = mi_password;
        this.nombre   = mi_nombre;
    }

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute("INSERT INTO users(username, password, nombre) VALUES (?,?,?)",
                [this.username, password_cifrado, this.nombre]
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    static fetchOne(username) {
        return db.execute("SELECT * FROM users WHERE username=?", [username]);
    }

    static getPrivilegios(username) {
        return db.execute(
            `SELECT privilegio FROM tiene t, roles r, otorga o, privilegios p
            WHERE id_usuario=? AND t.id_rol=r.id AND r.id=o.id_rol AND id_privilegio=p.id`,
            [username]
        );
    }

}