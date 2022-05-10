// Initialize and add the map
function initMap() {
  // The location of Mishka
  const mishka = { lat: 59.9388, lng: 30.3231 }; // @59.9387192,30.3208587,17
  // The map, centered at Mishka
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: mishka,
  });
  // The marker, positioned at Mishka
  const marker = new google.maps.Marker({
    position: mishka,
    map: map,
    icon: `img/index/map-pin.svg`,
  });
}

window.initMap = initMap;

