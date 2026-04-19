// Lab 24 - A01713207 Oscar Alexander Vilchis Soto
// public/js/buscador.js

const buscador      = document.getElementById('buscador');
const grid          = document.getElementById('grid-peliculas');
const sinResultados = document.getElementById('sin-resultados');
const count         = document.getElementById('resultado-count');

const crearTarjeta = (peli) => `
  <div class="column is-one-quarter-desktop is-half-tablet">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by3">
          <img src="${peli.imagen}" alt="Póster de ${peli.titulo}">
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-5">${peli.titulo}</p>
        <a href="/cartelera/${peli.id}" class="button is-small is-info">Ver detalle</a>
      </div>
    </div>
  </div>
`;

let debounceTimer;

buscador.addEventListener('input', () => {
  const query = buscador.value.trim();

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {

    if (!query) {
      window.location.reload();
      return;
    }

    // Petición asíncrona al servidor
    fetch(`/peliculas/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        const peliculas = data.peliculas;

        if (peliculas.length === 0) {
          grid.innerHTML = '';
          sinResultados.classList.remove('is-hidden');
          count.textContent = '0 películas encontradas';
        } else {
          sinResultados.classList.add('is-hidden');
          grid.innerHTML = peliculas.map(crearTarjeta).join('');
          count.textContent = `${peliculas.length} película(s) encontrada(s)`;
        }
      })
      .catch(err => {
        console.error('Error en búsqueda AJAX:', err);
      });

  }, 300);
});