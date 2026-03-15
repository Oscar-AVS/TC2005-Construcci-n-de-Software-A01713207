// Laboratorio 12 - A01713207 Oscar Alexander Vilchis Soto
// app.js
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');

const carteleraRoutes = require('./routes/cartelera.routes');
const peliculasRoutes = require('./routes/peliculas.routes');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use('/cartelera', carteleraRoutes);
app.use('/peliculas', peliculasRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Cartelera' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(3000);
console.log('Servidor en http://localhost:3000');