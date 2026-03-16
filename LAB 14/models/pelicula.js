// Lab 14 - A01713207 Oscar Alexander Vilchis Soto
// models/pelicula.js
const fs   = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', 'peliculas.txt');

module.exports = class Pelicula {

  constructor(titulo, imagen) {
    this.titulo = titulo;
    this.imagen = imagen;
  }

  save() {
    const peliculas = Pelicula.fetchAll();
    peliculas.push(this);
    Pelicula._escribir(peliculas);
  }

  static fetchAll() {
    if (!fs.existsSync(ARCHIVO)) {
      const iniciales = [
        new Pelicula('Interstellar', 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'),
        new Pelicula('Inception',    'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'),
      ];
      Pelicula._escribir(iniciales);
      return iniciales;
    }

    return fs.readFileSync(ARCHIVO, 'utf8')
      .split('\n')
      .filter(l => l.trim() !== '')
      .map(linea => {
        const sep = linea.indexOf('|');
        return new Pelicula(linea.substring(0, sep), linea.substring(sep + 1));
      });
  }

  static findById(id) {
    const peliculas = Pelicula.fetchAll();
    return peliculas[id] || null;
  }

  static updateById(id, titulo, imagen) {
    const peliculas = Pelicula.fetchAll();
    if (!peliculas[id]) return false;
    peliculas[id].titulo = titulo;
    peliculas[id].imagen = imagen;
    Pelicula._escribir(peliculas);
    return true;
  }

  static _escribir(peliculas) {
    const contenido = peliculas.map(p => `${p.titulo}|${p.imagen}`).join('\n');
    fs.writeFileSync(ARCHIVO, contenido, 'utf8');
  }

};