/**
 * @author Alexandre Benzonana
 * @version 1.2
 */

var url = "datas.php";
var addr_apikey = '9c3e017538374c20828840ceaf60bc7b';
var addr_api_url = 'https://api.opencagedata.com/geocode/v1/json';

navigator.geolocation.getCurrentPosition(setPosition);

/**
 * Fetch datas from php file 
 */
function getDatas() {
    GPSToAdress();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let d = this.responseText;
            d = JSON.parse(d);
            document.getElementById('airportList').innerHTML = "";
            search(d);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/**
 * get html form lat, lon values then transform them in adress
 */
function getGPSDatas() {
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    GPSToAdress(lon, lat);
}

/**
 * get html form adress value then transform it to lat lon
 */
function getAddrDatas() {
    adressToGPS(document.getElementById('adress').value);
}

/**
 * transform adress so lat lon then search on the map
 * @param {string} adress  
 */
function adressToGPS(adress) {
    var request_url = addr_api_url +
        '?' +
        'key=' + addr_apikey +
        '&q=' + encodeURIComponent(adress) +
        '&pretty=1' +
        '&no_annotations=1';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var addrData = JSON.parse(this.responseText);
            document.getElementById('lat').value = addrData.results[0].geometry.lat;
            document.getElementById('lon').value = addrData.results[0].geometry.lng;
            document.getElementById('adress').value = addrData.results[0].formatted;
            search();
        }
    };
    xmlhttp.open("GET", request_url, true);
    xmlhttp.send();
}

/**
 * take coords to transform them in and human readable adress
 * @param {double} lon 
 * @param {double} lat 
 */
function GPSToAdress(lon, lat) {
    var request_url = addr_api_url +
        '?' +
        'key=' + addr_apikey +
        '&q=' + encodeURIComponent(lat + ',' + lon) +
        '&pretty=1' +
        '&no_annotations=1';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var addrData = JSON.parse(this.responseText);
            document.getElementById('lat').value = addrData.results[0].geometry.lat;
            document.getElementById('lon').value = addrData.results[0].geometry.lng;
            document.getElementById('adress').value = addrData.results[0].formatted;
            getDatas();
        }
    };
    xmlhttp.open("GET", request_url, true);
    xmlhttp.send();
}

/**
 * take datas airports array to searck near airports on the map
 * @param {array} datas 
 */
function search(datas) {
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    var distance = document.getElementById('distance').value;

    clearMarkers();
    removeCirle();
    airportMap.flyTo([lat, lon], 7);

    addCircle(lat, lon, distance);
    datas = datas.rows;
    datas.forEach(calcDist);
}

/**
 * ask user position on hitting button
 */
function getUserPos() {
    navigator.geolocation.getCurrentPosition(setPosition);
}

/**
 * Take airport datas to check distance between them and user choosen location
 * @param {array} value 
 * @param {int} index 
 * @param {array} array 
 */
function calcDist(value, index, array) {

    var dist = getDistanceFromLatLonInKm(lat.value, lon.value, value.lat, value.lon);
    if (getDistanceFromLatLonInKm(lat.value, lon.value, value.lat, value.lon) <= distance.value) {
        var parent = document.createElement("tr");
        var child1 = document.createElement("td");
        var child2 = document.createElement("td");

        child1.innerHTML = value.name;
        child2.innerHTML = Math.round(dist * 100) / 100 + " KM";
        parent.appendChild(child1);
        parent.appendChild(child2);

        document.getElementById('airportList').appendChild(parent);

        addMarker(value.lat, value.lon, value.name + "<br>" + Math.round(dist * 100) / 100 + " KM");
    }
}

/**
 * Change choosen location on the map
 * @param {action} e 
 */
function setNewLocation(e) {
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lon').value = e.latlng.lng;
    GPSToAdress(e.latlng.lng, e.latlng.lat);
    getDatas();
}

/**
 * change form values to give parameters
 * @param {array} pos 
 */
function setPosition(pos) {
    document.getElementById('lat').value = pos.coords.latitude;
    document.getElementById('lon').value = pos.coords.longitude;
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
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

/**
 * Convert degrees into radians.
 * @param {number} deg - degree to convert.
 * @return {number} converted value in radian.
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}