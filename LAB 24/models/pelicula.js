// Lab 24 - A01713207 Oscar Alexander Vilchis Soto
// models/pelicula.js
const db = require('../util/database');

module.exports = class Pelicula {

  constructor(titulo, imagen, sinopsis) {
    this.titulo   = titulo;
    this.imagen   = imagen;
    this.sinopsis = sinopsis;
  }

  save() {
    return db.execute(
      'INSERT INTO peliculas (titulo, imagen, sinopsis) VALUES (?, ?, ?)',
      [this.titulo, this.imagen, this.sinopsis]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM peliculas');
  }

  static fetchOne(id) {
    return db.execute('SELECT * FROM peliculas WHERE id = ?', [id]);
  }

  static updateById(id, titulo, imagen, sinopsis) {
    return db.execute(
      'UPDATE peliculas SET titulo = ?, imagen = ?, sinopsis = ? WHERE id = ?',
      [titulo, imagen, sinopsis, id]
    );
  }

  static search(query) {
    const like = `%${query}%`;
    return db.execute(
      'SELECT * FROM peliculas WHERE titulo LIKE ? OR sinopsis LIKE ?',
      [like, like]
    );
  }

};