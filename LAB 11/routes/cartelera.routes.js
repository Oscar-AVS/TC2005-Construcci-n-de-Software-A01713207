// Laboratorio 11 - A01713207 Oscar Alexander Vilchis Soto
// Archivo de rutas para la cartelera de películas
// se definen las rutas para mostrar la lista de películas y los detalles de cada película se utiliza un
//  archivo de texto para almacenar la información de las películas, lo que permite agregar nuevas películas sin necesidad de una base de datos

const express = require('express');
const router  = express.Router();
const fs      = require('fs');

const ARCHIVO = 'peliculas.txt';

function cargarPeliculas() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      { titulo: 'Interstellar', imagen: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
      { titulo: 'Inception',    imagen: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
    ];
    guardarPeliculas(iniciales);
    return iniciales;
  }

  return fs.readFileSync(ARCHIVO, 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const sep = linea.indexOf('|');
      return { titulo: linea.substring(0, sep), imagen: linea.substring(sep + 1) };
    });
}

function guardarPeliculas(peliculas) {
  const contenido = peliculas.map(p => `${p.titulo}|${p.imagen}`).join('\n');
  fs.writeFileSync(ARCHIVO, contenido, 'utf8');
}

const header = (title) => `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <section class="section">
        <div class="container">
`;

const footer = `
        </div>
      </section>
    </body>
  </html>
`;

// GET cartelera
router.get('/', (req, res) => {
  const peliculas = cargarPeliculas();

  let cards = '';
  for (const peli of peliculas) {
    const id = peliculas.indexOf(peli);
    cards += `
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-2by3">
              <img src="${peli.imagen}" alt="Póster de ${peli.titulo}">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-5">${peli.titulo}</p>
            <a href="/cartelera/${id}" class="button is-small is-info">Ver detalle</a>
          </div>
        </div>
      </div>
    `;
  }

  res.send(`
    ${header('Cartelera')}
    <h1 class="title">Cartelera</h1>
    <p class="subtitle">${peliculas.length} películas</p>
    <a href="/peliculas/new" class="button is-primary mb-5">Agregar película</a>
    <div class="columns is-multiline">${cards}</div>
    ${footer}
  `);
});

// GET cartelera id
router.get('/:id', (req, res) => {
  const peliculas = cargarPeliculas();
  const id        = parseInt(req.params.id);
  const peli      = peliculas[id];

  if (!peli) {
    return res.status(404).send(`
      ${header('No encontrada')}
      <h1 class="title has-text-danger">Película no encontrada</h1>
      <a href="/cartelera" class="button is-warning">Volver a cartelera</a>
      ${footer}
    `);
  }

  res.send(`
    ${header(peli.titulo)}
    <h1 class="title">${peli.titulo}</h1>
    <figure class="image" style="max-width:300px">
      <img src="${peli.imagen}" alt="Póster de ${peli.titulo}">
    </figure>
    <br>
    <a href="/cartelera" class="button is-warning mt-4">Volver a cartelera</a>
    ${footer}
  `);
});

module.exports = router;