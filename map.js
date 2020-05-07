/**
 * @author Alexandre Benzonana
 * @version 1.2
 */

var airportMap = L.map('mapid').setView([10, 10], 2);
var markers = [];
var circle;

var layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleGJuem5uIiwiYSI6ImNrOHUyb2JjczAwcmszaHAzN2R3Y2hsNHMifQ.VgVRnMVYc6GBhbDTWbp5Jg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(airportMap);

function analizeDatas(datas) {
    datas = datas['rows'];
    datas.forEach(addMarker);

}

function addMarker(lat, lon, message) {
    markers.push(L.marker([lat, lon]));
    airportMap.addLayer(markers[markers.length - 1]);
    markers[markers.length - 1].bindPopup(message);
}

function addCircle(lat, lon, distance) {
    circle = L.circle([lat, lon], {
        color: '#edf',
        fillColor: '##f54',
        fillOpacity: 0.2,
        radius: distance * 1000
    });
    airportMap.addLayer(circle);

}

function clearMarkers() {
    markers.forEach(removeMarker);
    markers = [];
}

function removeMarker(value, index, array) {
    airportMap.removeLayer(value);
}

function removeCirle() {
    if (circle != null && circle != " ") {
        airportMap.removeLayer(circle);
    }
}

airportMap.on('click', setNewLocation);