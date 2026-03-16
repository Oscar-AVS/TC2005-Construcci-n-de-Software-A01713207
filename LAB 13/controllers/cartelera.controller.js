// Lab 13 - A01713207 Oscar Alexander Vilchis Soto
// controllers/cartelera.controller.js
const Pelicula = require('../models/pelicula');

exports.getCartelera = (req, res) => {
  const peliculas = Pelicula.fetchAll();
  res.render('cartelera', { title: 'Cartelera', peliculas });
};

exports.getDetalle = (req, res) => {
  const peliculas = Pelicula.fetchAll();
  const id        = parseInt(req.params.id);
  const peli      = peliculas[id];

  if (!peli) {
    return res.status(404).render('404', { title: 'No encontrada' });
  }

  res.render('detalle', { title: peli.titulo, peli, id });
};