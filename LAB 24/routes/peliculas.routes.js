// Lab 22 - A01713207 Oscar Alexander Vilchis Soto
// routes/peliculas.routes.js
const express             = require('express');
const router              = express.Router();
const peliculasController = require('../controllers/peliculas.controller');
const isAuth              = require('../util/is-auth');
const canView             = require('../util/can-view');
const canCreate           = require('../util/can-create');
const canEdit             = require('../util/can-edit');

router.get('/new',       isAuth, canCreate, peliculasController.getNueva);
router.post('/new',      isAuth, canCreate, peliculasController.postNueva);
router.get('/:id/edit',  isAuth, canEdit,   peliculasController.getEditar);
router.post('/:id/edit', isAuth, canEdit,   peliculasController.postEditar);

module.exports = router;