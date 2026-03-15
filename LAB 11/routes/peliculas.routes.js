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

// GET peliculas nuevas 
router.get('/new', (req, res) => {
  res.send(`
    ${header('Nueva película')}
    <h1 class="title">Nueva película</h1>
    <form action="/peliculas/new" method="POST">
      <div class="field">
        <label for="titulo" class="label">Título</label>
        <div class="control">
          <input id="titulo" name="titulo" class="input" type="text" placeholder="e.g. Pantera Negra">
        </div>
      </div>
      <div class="field">
        <label for="imagen" class="label">URL del póster</label>
        <div class="control">
          <input id="imagen" name="imagen" class="input" type="text" placeholder="https://...">
        </div>
      </div>
      <input class="button is-primary" type="submit" value="Guardar película">
      <a href="/cartelera" class="button is-light">Cancelar</a>
    </form>
    ${footer}
  `);
});

// POST peliculas nuevas 
router.post('/new', (req, res) => {
  const titulo = (req.body.titulo || '').trim();
  const imagen = (req.body.imagen || '').trim();

  if (titulo) {
    const peliculas = cargarPeliculas();
    peliculas.push({ titulo, imagen });
    guardarPeliculas(peliculas);
  }

  res.redirect('/cartelera');
});

module.exports = router;
