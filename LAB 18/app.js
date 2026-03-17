// Lab 18 - A01713207 Oscar Alexander Vilchis Soto
// app.js
const express    = require('express');
const app        = express();
const path       = require('path');
const session    = require('express-session');
const bodyParser = require('body-parser');
const csrf       = require('csurf');

const carteleraRoutes = require('./routes/cartelera.routes');
const peliculasRoutes = require('./routes/peliculas.routes');
const usersRoutes     = require('./routes/users.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false,
    saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));

const csrfProtection = csrf();
app.use(csrfProtection);

// Middleware para pasar variables a views
app.use((request, response, next) => {
    response.locals.csrfToken  = request.csrfToken();
    response.locals.isLoggedIn = request.session.isLoggedIn || false;
    response.locals.username   = request.session.username   || '';
    next();
});

app.use('/cartelera', carteleraRoutes);
app.use('/peliculas', peliculasRoutes);
app.use('/users',     usersRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Cartelera' });
});

// Error handler
app.use((error, request, response, next) => {
    response.status(500).send(`Error interno del servidor: ${error.stack}`);
});

// 404
app.use((request, response, next) => {
    response.status(404).render('404', { title: '404' });
});

app.listen(3000);
console.log('Servidor en http://localhost:3000');