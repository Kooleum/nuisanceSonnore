<?php
$ip = $_SERVER['REMOTE_ADDR'];

$info = json_decode(file_get_contents('https://ipapi.co/' . $ip . '/json/?key=c2AUDS9s9a7GhWarRDk3SWHnD8RhDIXIxvlBwM7u6aABtritdZ'));
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
    <style>
        #mapid {
            height: 85vh;
        }

        #tableAirport {
            max-height: 50vh;
            overflow: auto;
        }
    </style>
    <title>Nuisances Sonnores</title>
</head>

<body class="container">
    <main class="row mt-2">
        <div class="col-4">
            <div class="form">
                <div class="form-row">
                    <div class="form-group col-9">
                        <label for="distance">Distance Max (Km)</label>
                        <input type="text" id="distance" value="50" class="form-control">
                    </div>
                    <div class="form-group col-3 mt-2">
                        <button onclick="getUserPos()" class="btn btn-outline-primary" class="form-control ml-1">Ma position</button>
                    </div>
                </div>
                <fieldset class="form-group px-2 pb-1" style="border: 1px solid #444; border-radius:3px">
                    <legend>Par coordonnées</legend>
                    <div class="form-group">
                        <label for="lat">Latitude</label>
                        <input type="text" id="lat" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="lon">Longitude</label>
                        <input type="text" id="lon" class="form-control">
                    </div>
                    <button onclick="getGPSDatas()" class="btn btn-outline-success" class="form-control ml-2 mt-5">Chercher</button>
                </fieldset>
                <fieldset class="form-group px-2 pb-1" style="border: 1px solid #444; border-radius:3px">
                    <legend>Par adresse</legend>
                    <div class="form-group">
                        <label for="lon">Adresse</label>
                        <input type="text" id="adress" class="form-control">
                    </div>
                    <button onclick="getAddrDatas()" class="btn btn-outline-success" class="form-control ml-2 mt-5">Chercher</button>
                </fieldset>
                <div class="form-row">
                    <div class="form-group">
                    </div>
                </div>
            </div>
            <div id="tableAirport">
                <table class="table table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Distance</th>
                        </tr>
                    </thead>
                    <tbody id="airportList">

                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-8">
            <div id="mapid"></div>
            <h4>Cliquez sur la carte pour choissir un autre point</h4>
        </div>
    </main>
    <script type="text/javascript" src="script.js"></script>
    <script src="map.js"></script>
</body>

</html>