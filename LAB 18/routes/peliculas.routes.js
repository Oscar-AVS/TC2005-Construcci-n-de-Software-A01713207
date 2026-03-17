// Lab 18 - A01713207 Oscar Alexander Vilchis Soto
// routes/peliculas.routes.js
const express             = require('express');
const router              = express.Router();
const peliculasController = require('../controllers/peliculas.controller');
const isAuth              = require('../util/is-auth');

router.get('/new',       isAuth, peliculasController.getNueva);
router.post('/new',      isAuth, peliculasController.postNueva);
router.get('/:id/edit',  isAuth, peliculasController.getEditar);
router.post('/:id/edit', isAuth, peliculasController.postEditar);

module.exports = router;