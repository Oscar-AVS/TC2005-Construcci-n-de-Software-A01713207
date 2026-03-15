// Laboratorio 10 - A01713207 Oscar Alexander Vilchis Soto 
// Partiendo del ejemplo realizado en clase con el profesor se adapta esta version para mi laboratorio 10 y subsecuentes
// Donde se establece una "cartelera" de pelis :D 


const http = require('http');
const fs   = require('fs');

//  Plantilla HTML 
const html_header = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cartelera</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <section class="section">
      <div class="container">
`;

const html_footer = `
      </div>
    </section>
  </body>
</html>
`;

//  Forms para agregar un nueva película 
const html_form = `
  <h1 class="title">Nueva película</h1>

  <form action="/new" method="POST">
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
`;

//  Persistencia en el archivo peliculas.txt con formato peli|url del psoter 
function cargarPeliculas() {
  if (!fs.existsSync('peliculas.txt')) {
    const iniciales = [
      { titulo: 'Interstellar', imagen: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
      { titulo: 'Inception',    imagen: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
    ];
    guardarPeliculas(iniciales);
    return iniciales;
  }

  return fs.readFileSync('peliculas.txt', 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const sep = linea.indexOf('|');
      return {
        titulo: linea.substring(0, sep),
        imagen: linea.substring(sep + 1),
      };
    });
}

function guardarPeliculas(peliculas) {
  const contenido = peliculas.map(p => `${p.titulo}|${p.imagen}`).join('\n');
  fs.writeFileSync('peliculas.txt', contenido, 'utf8');
}

//  Servidor 


const server = http.createServer((request, response) => {
if (request.url === '/style.css' && request.method === 'GET') {
  response.setHeader('Content-Type', 'text/css; charset=utf-8');
  response.write(fs.readFileSync('style.css', 'utf8'));
  response.end();
  return;
}

  //  GET Página de inicio con enlaces a cartelera y formulario
  if (request.url === '/' && request.method === 'GET') {
    const html_index = `
      <h1 class="title">Laboratorio 10</h1>
      <p class="subtitle">A01713207 — Oscar Alexander Vilchis Soto</p>
      <a href="/cartelera" class="button is-warning">Ver cartelera</a>
      <a href="/new"       class="button is-primary">Agregar película</a>
    `;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_index + html_footer);
    response.end();
    return;
  }

  //  GET
  if (request.url === '/cartelera' && request.method === 'GET') {
    const peliculas = cargarPeliculas();

    let html_cartelera = `
      <h1 class="title"> Cartelera</h1>
      <p class="subtitle">${peliculas.length} películas</p>
      <a href="/new" class="button is-primary mb-5">Agregar película</a>
      <div class="columns is-multiline">
    `;

    for (let peli of peliculas) {
      html_cartelera += `
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
            <div class="card-image">
              <figure class="image is-2by3">
                <img src="${(peli.imagen)}" alt="Póster de ${(peli.titulo)}">
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-5">${(peli.titulo)}</p>
            </div>
          </div>
        </div>
      `;
    }

    html_cartelera += `</div>`;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_cartelera + html_footer);
    response.end();
    return;
  }

  //  GET Formulario  para nueva pelicula
  if (request.url === '/new' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_form + html_footer);
    response.end();
    return;
  }

  //  POST Guardar película en peliculas.txt 
  if (request.url === '/new' && request.method === 'POST') {
    const datos_completos = [];

    request.on('data', (data) => {
      datos_completos.push(data);
    });

    request.on('end', () => {
     
      const params = new URLSearchParams(Buffer.concat(datos_completos).toString());
      const titulo = (params.get('titulo') || '').trim();
      const imagen = (params.get('imagen') || '').trim();

      if (titulo) {
        const peliculas = cargarPeliculas();
        peliculas.push({ titulo, imagen });
        guardarPeliculas(peliculas);
      }

      response.writeHead(302, { Location: '/cartelera' });
      response.end();
    });

    return;
  }

  //  404 
  const html_404 = `
    <h1 class="title has-text-danger">404</h1>
    <p class="subtitle">Página no encontrada</p>
    <a href="/" class="button is-primary">Volver al inicio</a>
  `;

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.writeHead(404);
  response.write(html_header + html_404 + html_footer);
  response.end();

});

server.listen(3000)
console.log('Servidor en http://localhost:3000');