// Lab 26 - A01713207 Oscar Alexander Vilchis Soto
// public/js/cines.js

const btnCines  = document.getElementById('btn-cines');
const mapaDiv   = document.getElementById('mapa');
const status    = document.getElementById('mapa-status');

let mapa = null;  

btnCines.addEventListener('click', () => {
  btnCines.disabled = true;
  status.textContent = '📡 Obteniendo tu ubicación...';

  // Pedir ubicación al navegador
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      status.textContent = '🔍 Buscando cines cercanos...';
      mapaDiv.style.display = 'block';

      if (!mapa) {
        mapa = L.map('mapa').setView([lat, lng], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapa);
      } else {
        mapa.setView([lat, lng], 14);
      }

      L.marker([lat, lng])
        .addTo(mapa)
        .bindPopup('📍 Tu ubicación')
        .openPopup();

      const overpassQuery = `
        [out:json];
        node["amenity"="cinema"](around:10000,${lat},${lng});
        out body;
      `;

      fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
      })
        .then(res => res.json())
        .then(data => {
          const cines = data.elements;

          if (cines.length === 0) {
            status.textContent = ':( No se encontraron cines cerca de ti en 10km.';
            return;
          }

          status.textContent = `✅ ${cines.length} cine(s) encontrado(s) cerca de ti.`;

          cines.forEach(cine => {
            const nombre    = cine.tags.name || 'Cine sin nombre';
            const direccion = cine.tags['addr:street'] || 'Dirección no disponible';

            L.marker([cine.lat, cine.lon])
              .addTo(mapa)
              .bindPopup(`
                <strong> ${nombre}</strong><br>
                📌 ${direccion}
              `);
          });
        })
        .catch(err => {
          console.error('Error Overpass:', err);
          status.textContent = ' Error al buscar cines. Intenta de nuevo.';
          btnCines.disabled = false;
        });
    },
    (err) => {
      // El usuario negó la ubicación
      console.error('Geolocation error:', err);
      status.textContent = 'Error: No se pudo obtener tu ubicación. Verifica los permisos del navegador.';
      btnCines.disabled = false;
    }
  );
});