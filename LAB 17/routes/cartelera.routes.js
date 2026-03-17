// Lab 17 - A01713207 Oscar Alexander Vilchis Soto
// routes/cartelera.routes.js
const express             = require('express');
const router              = express.Router();
const carteleraController = require('../controllers/cartelera.controller');

router.get('/',     carteleraController.getCartelera);
router.get('/:id',  carteleraController.getDetalle);

module.exports = router;