var map = L.map('map').setView([-27.4752595, -58.8526136], 20);

// Agregar una capa de mapa base (puedes usar otras fuentes de mapas)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var markers = [];

// Cargar marcadores guardados del Local Storage
if (localStorage.getItem('markers')) {
    markers = JSON.parse(localStorage.getItem('markers'));

    markers.forEach(function(markerData) {
        var marker = L.marker(markerData.latlng).addTo(map);
        marker.bindPopup(markerData.popupContent);
    });
}

// Evento clic para agregar marcadores
map.on('click', function(e) {
    var popupContent = prompt('Ingrese contenido para el marcador:');
    if (popupContent) {
        var marker = L.marker(e.latlng).addTo(map).bindPopup(popupContent);
        markers.push({ latlng: e.latlng, popupContent: popupContent });
        saveMarkersToLocalStorage();
    }
});

// Función para guardar marcadores en el Local Storage
function saveMarkersToLocalStorage() {
    localStorage.setItem('markers', JSON.stringify(markers));
}