// Lab 14 - A01713207 Oscar Alexander Vilchis Soto
// routes/peliculas.routes.js
const express             = require('express');
const router              = express.Router();
const peliculasController = require('../controllers/peliculas.controller');

router.get('/new',       peliculasController.getNueva);
router.post('/new',      peliculasController.postNueva);
router.get('/:id/edit',  peliculasController.getEditar);
router.post('/:id/edit', peliculasController.postEditar);

module.exports = router;