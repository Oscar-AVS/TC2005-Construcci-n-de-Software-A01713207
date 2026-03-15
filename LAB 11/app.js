// Laboratorio 11 - A01713207 Oscar Alexander Vilchis Soto 
// Partiendo del ejemplo realizado en clase con el profesor se adapta esta version que nace desde el lab 10 
// donde se aplica un estilo de cartelera de pelis para mi laboratorio 11 y subsecuentes
const express    = require('express');
const bodyParser = require('body-parser');

const carteleraRoutes = require('./routes/cartelera.routes');
const peliculasRoutes = require('./routes/peliculas.routes');

const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use('/cartelera', carteleraRoutes);
app.use('/peliculas', peliculasRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Cartelera</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <section class="section">
          <div class="container">
            <h1 class="title">Laboratorio 11</h1>
            <p class="subtitle">A01713207 — Oscar Alexander Vilchis Soto</p>
            <a href="/cartelera" class="button is-warning">Ver cartelera</a>
            <a href="/peliculas/new" class="button is-primary">Agregar película</a>

            <h2 class="title is-4 mt-4">¿Qué es package.json?</h2>
            <div class="content">
              <p>El archivo package.json es un archivo que contiene información importante sobre el proyecto.
               Contiene:</p>
              <ul>
                <li><strong>name y version:</strong> identifican el proyecto</li>
                <li><strong>scripts:</strong> comandos como start y dev para correr el servidor</li>
                <li><strong>dependencies:</strong> los paquetes que el proyecto necesita para funcionar, como express y body-parser</li>
              </ul>
            </div>


          </div>
        </section>
      </body>
    </html>
  `);
});

// 404
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>404</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
      </head>
      <body>
        <section class="section">
          <div class="container">
            <h1 class="title has-text-danger">404</h1>
            <p class="subtitle">Página no encontrada</p>
            <a href="/" class="button is-primary">Volver al inicio</a>
          </div>
        </section>
      </body>
    </html>
  `);
});

app.listen(3000);
console.log('Servidor en http://localhost:3000');