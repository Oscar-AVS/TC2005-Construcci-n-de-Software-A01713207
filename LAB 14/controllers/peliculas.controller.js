// Lab 14 - A01713207 Oscar Alexander Vilchis Soto
// controllers/peliculas.controller.js
const Pelicula = require('../models/pelicula');

exports.getNueva = (req, res) => {
  res.render('nueva', { title: 'Nueva película' });
};

exports.postNueva = (req, res) => {
  const titulo = (req.body.titulo || '').trim();
  const imagen = (req.body.imagen || '').trim();

  if (titulo) {
    const peli = new Pelicula(titulo, imagen);
    peli.save();
  }

  res.redirect('/cartelera');
};

exports.getEditar = (req, res) => {
  const id   = parseInt(req.params.id);
  const peli = Pelicula.findById(id);

  if (!peli) {
    return res.status(404).render('404', { title: 'No encontrada' });
  }

  res.render('editar', { title: `Editar: ${peli.titulo}`, peli, id });
};

exports.postEditar = (req, res) => {
  const id     = parseInt(req.params.id);
  const titulo = (req.body.titulo || '').trim();
  const imagen = (req.body.imagen || '').trim();

  if (!titulo) {
    return res.redirect(`/peliculas/${id}/edit`);
  }

  const actualizado = Pelicula.updateById(id, titulo, imagen);

  if (!actualizado) {
    return res.status(404).render('404', { title: 'No encontrada' });
  }

  res.redirect(`/cartelera/${id}`);
};