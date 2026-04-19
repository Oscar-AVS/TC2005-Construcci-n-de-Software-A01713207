// Lab 24 - A01713207 Oscar Alexander Vilchis Soto
// controllers/peliculas.controller.js
const Pelicula = require('../models/pelicula');

exports.getNueva = (req, res) => {
  res.render('nueva', { 
    title: 'Nueva película',
    privilegios: req.session.privilegios || [],
  });
};

exports.postNueva = (req, res, next) => {
  const titulo   = (req.body.titulo   || '').trim();
  const sinopsis = (req.body.sinopsis || '').trim();

  if (!req.file) return res.redirect('/peliculas/new'); 
  const imagen = req.file.path;

  if (!titulo) return res.redirect('/peliculas/new');

  const peli = new Pelicula(titulo, imagen, sinopsis);
  peli.save()
    .then(() => res.redirect('/cartelera'))
    .catch(err => { console.log(err); next(err); });
};

exports.getEditar = (req, res, next) => {
  const id = req.params.id;

  Pelicula.fetchOne(id)
    .then(([rows]) => {
      const peli = rows[0];
      if (!peli) return res.status(404).render('404', { title: 'No encontrada' });
      res.render('editar', { 
        title: `Editar: ${peli.titulo}`, 
        peli, 
        id,
        privilegios: req.session.privilegios || [],
      });
    })
    .catch(err => { console.log(err); next(err); });
};

exports.postEditar = (req, res, next) => {
  const id       = req.params.id;
  const titulo   = (req.body.titulo   || '').trim();
  const sinopsis = (req.body.sinopsis || '').trim();

  if (!titulo) return res.redirect(`/peliculas/${id}/edit`);

  Pelicula.fetchOne(id)
    .then(([rows]) => {
      const peli = rows[0];
      if (!peli) return res.status(404).render('404', { title: 'No encontrada' });

      const imagen = req.file ? req.file.path : peli.imagen;

      return Pelicula.updateById(id, titulo, imagen, sinopsis);
    })
    .then(() => res.redirect(`/cartelera/${id}`))
    .catch(err => { console.log(err); next(err); });
};

// AJAX - búsqueda en tiempo real
exports.searchAjax = (req, res, next) => {
  const query = (req.query.q || '').trim();
    res.set('Cache-Control', 'no-store');


  if (!query) {
    return res.status(200).json({ peliculas: [] });
  }

  Pelicula.search(query)
    .then(([rows]) => {
      res.status(200).json({ peliculas: rows });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error al buscar películas' });
    });
};