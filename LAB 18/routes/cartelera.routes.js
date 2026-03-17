// Lab 18 - A01713207 Oscar Alexander Vilchis Soto
// routes/cartelera.routes.js
const express             = require('express');
const router              = express.Router();
const carteleraController = require('../controllers/cartelera.controller');
const isAuth              = require('../util/is-auth');

router.get('/',    isAuth, carteleraController.getCartelera);
router.get('/:id', isAuth, carteleraController.getDetalle);

module.exports = router;