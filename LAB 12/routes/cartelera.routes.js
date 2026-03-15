// Laboratorio 12 - A01713207 Oscar Alexander Vilchis Soto
// cartelera.routes.js
const express = require('express');
const router  = express.Router();
const fs      = require('fs');

const ARCHIVO = 'peliculas.txt';

function cargarPeliculas() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      { titulo: 'Interstellar', imagen: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
      { titulo: 'Inception',    imagen: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
    ];
    guardarPeliculas(iniciales);
    return iniciales;
  }

  return fs.readFileSync(ARCHIVO, 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const sep = linea.indexOf('|');
      return { titulo: linea.substring(0, sep), imagen: linea.substring(sep + 1) };
    });
}

function guardarPeliculas(peliculas) {
  const contenido = peliculas.map(p => `${p.titulo}|${p.imagen}`).join('\n');
  fs.writeFileSync(ARCHIVO, contenido, 'utf8');
}

// GET /cartelera
router.get('/', (req, res) => {
  const peliculas = cargarPeliculas();
  res.render('cartelera', { title: 'Cartelera', peliculas });
});

// GET /cartelera/:id
router.get('/:id', (req, res) => {
  const peliculas = cargarPeliculas();
  const id        = parseInt(req.params.id);
  const peli      = peliculas[id];

  if (!peli) {
    return res.status(404).render('404', { title: 'No encontrada' });
  }

  res.render('detalle', { title: peli.titulo, peli });
});

module.exports = router;