// Laboratorio 17- A01713207 Oscar Alexander Vilchis Soto
// main.js  

const peliculas = [
  {
    titulo: 'Interstellar',
    genero: 'Ciencia ficción',
    sinopsis: 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad, enfrentando los misterios del espacio y el tiempo.',
  },
  {
    titulo: 'Inception',
    genero: 'Ciencia ficción / Thriller',
    sinopsis: 'Un ladrón que roba secretos corporativos a través del sueño recibe la tarea inversa: plantar una idea en la mente de un objetivo.',
  },
  {
    titulo: 'El hombre de la mascara de hierro',
    genero: 'Aventura / Drama histórico',
    sinopsis: 'Los mosqueteros descubren que el rey de Francia tiene un gemelo secreto encerrado con una máscara de hierro, y planean un audaz rescate para restaurar la justicia.',
  },
  {
    titulo: 'Tierra de Nadie',
    genero: 'Drama / Acción ',
    sinopsis: 'Kate Macer, una agente de élite del FBI, viaja a la frontera entre México y Estados Unidos para intentar capturar a un importante narcotraficante',
  },
  {
    titulo: 'Titanes del pacifico',
    genero: 'Ciencia ficción / Acción',
    sinopsis: 'La humanidad construye inmensos robots llamados Jaegers para combatir a los Kaijus, monstruos colosales que emergen de un portal interdimensional en el Océano Pacífico.',
  },
];

const contenedor = document.getElementById('detalle-pelicula');

if (contenedor) {
  const titulo = contenedor.dataset.titulo;
  const imagen = contenedor.dataset.imagen;
  const pelicula = peliculas.find(p => p.titulo === titulo);

  const mostrar_imagen = () => {
    contenedor.innerHTML = `
      <figure class="image" style="max-width:300px">
        <img src="${imagen}" alt="Póster de ${titulo}">
      </figure>
      <p class="mt-3 has-text-grey-light">Click para ver sinopsis</p>
    `;
    contenedor.onclick = mostrar_sinopsis;
  };

  const mostrar_sinopsis = () => {
    contenedor.innerHTML = `
      <p class="title is-4">${pelicula.titulo}</p>
      <span class="tag is-warning mb-3">${pelicula.genero}</span>
      <p>${pelicula.sinopsis}</p>
      <p class="mt-3 has-text-grey-light">Click para ver póster</p>
    `;
    contenedor.onclick = mostrar_imagen;
  };

  if (pelicula) {
    mostrar_imagen();
    contenedor.onclick = mostrar_sinopsis;
  }
}