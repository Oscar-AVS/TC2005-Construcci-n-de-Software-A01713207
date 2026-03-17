// Lab 17 - A01713207 Oscar Alexander Vilchis Soto
// controllers/cartelera.controller.js
const Pelicula = require('../models/pelicula');

exports.getCartelera = (req, res, next) => {
  Pelicula.fetchAll()
    .then(([rows]) => {
      res.render('cartelera', { title: 'Cartelera', peliculas: rows });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

exports.getDetalle = (req, res, next) => {
  const id = req.params.id;

  Pelicula.fetchOne(id)
    .then(([rows]) => {
      const peli = rows[0];
      if (!peli) return res.status(404).render('404', { title: 'No encontrada' });
      res.render('detalle', { title: peli.titulo, peli, id });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};