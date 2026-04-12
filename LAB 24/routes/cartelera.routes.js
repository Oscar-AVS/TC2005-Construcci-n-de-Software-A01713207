// Lab 24 - A01713207 Oscar Alexander Vilchis Soto
// routes/cartelera.routes.js
const express             = require('express');
const router              = express.Router();
const carteleraController = require('../controllers/cartelera.controller');
const isAuth              = require('../util/is-auth');
const canView             = require('../util/can-view');

router.get('/',    isAuth, canView, carteleraController.getCartelera);
router.get('/:id', isAuth, canView, carteleraController.getDetalle);

module.exports = router;