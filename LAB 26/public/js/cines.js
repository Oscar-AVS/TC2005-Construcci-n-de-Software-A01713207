// Lab 26 - A01713207 Oscar Alexander Vilchis Soto
// public/js/cines.js

const btnCines = document.getElementById('btn-cines');
const mapaDiv = document.getElementById('mapa');
const status = document.getElementById('mapa-status');

let mapa = null;

btnCines.addEventListener('click', () => {
    btnCines.disabled = true;
    status.textContent = ' Obteniendo tu ubicación...';

    // Pedir ubicación al navegador
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            status.textContent = ' Buscando cines cercanos...';
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

            // Buscar cines cercanos con Nominatim
            fetch(`https://nominatim.openstreetmap.org/search?q=cinema&lat=${lat}&lon=${lng}&format=json&limit=10&bounded=1&viewbox=${lng - 0.1},${lat + 0.1},${lng + 0.1},${lat - 0.1}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length === 0) {
                        status.textContent = 'Lo lamentamos, no se encontraron cines cerca :( ';
                    } else {
                        status.textContent = ` ${data.length} cine(s) encontrado(s) cerca de ti.`;
                        data.forEach(cine => {
                            L.marker([cine.lat, cine.lon])
                                .addTo(mapa)
                                .bindPopup(`<strong>🎬 ${cine.display_name.split(',')[0]}</strong>`);
                        });
                    }
                    btnCines.disabled = false; // Reactivar al terminar
                })
                .catch(err => {
                    console.error('Error Nominatim:', err);
                    status.textContent = 'Error al buscar cines.';
                    btnCines.disabled = false;
                });
        },
        (error) => {
            console.error('Error Geolocation:', error);
            status.textContent = 'Error: No se pudo acceder a tu ubicación.';
            btnCines.disabled = false;
        }
    );
});