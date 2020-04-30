var url = "datas.php";
var datasFetched = false;
var nearAirports = [];

function getDatas() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            datas = this.responseText;
            datas = JSON.parse(datas);
            document.getElementById('airportList').innerHTML = "";
            search();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function search() {
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    var distance = document.getElementById('distance').value;

    clearMarkers();
    removeCirle();
    airportMap.flyTo([lat, lon], 7);

    addCircle(lat, lon, distance)
    datas = datas['rows'];
    datas.forEach(calcDist);
}


function calcDist(value, index, array) {

    var dist = getDistanceFromLatLonInKm(lat.value, lon.value, value['lat'], value['lon']);
    if (getDistanceFromLatLonInKm(lat.value, lon.value, value['lat'], value['lon']) <= distance.value) {
        var parent = document.createElement("tr");
        var child1 = document.createElement("td");
        var child2 = document.createElement("td");

        child1.innerHTML = value['name'];
        child2.innerHTML = Math.round(dist * 100) / 100 + " KM";
        parent.appendChild(child1);
        parent.appendChild(child2);

        document.getElementById('airportList').appendChild(parent);
        // document.getElementById('airportList').innerHTML = "<tr><td>" + document.getElementById('airportList').innerHTML + value['name'] + "</td><td>" + Math.round(dist * 100) / 100 + " KM</td></tr>"

        addMarker(value['lat'], value['lon'], value['name'] + "<br>" + Math.round(dist * 100) / 100 + " KM");
    }
}

function setNewLocation(e) {
    document.getElementById('lat').value = e.latlng['lat'];
    document.getElementById('lon').value = e.latlng['lng'];
    getDatas();
}


/* Source code adapted from: http://www.movable-type.co.uk/scripts/latlong.html */

/**
 * Compute the distance in km between 2 positions on the sphere
 * @param {number} lat1 - The latitude of the first position.
 * @param {number} lon1 - The longitude of the first position.
 * @param {number} lat2 - The latitude of the second position.
 * @param {number} lon2 - The longitude of the second position.
 * @return {number} The distance in km between the 2 positions.
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

/**
 * Convert degrees into radians.
 * @param {number} deg - degree to convert.
 * @return {number} converted value in radian.
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}