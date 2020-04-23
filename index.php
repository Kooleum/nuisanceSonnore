<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
   <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
   <style>
       #mapid { 
           height: 85vh; 
           }

        #tableAirport{
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
                <div class="form-group">    
                    <label for="lat">Latitude</label>
                    <input type="text" id="lat" class="form-control">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="lon">Longitude</label>
                        <input type="text" id="lon" class="form-control ml-2">
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="distance">Distance Max</label>
                    <input type="text" id="distance" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <button onclick="getDatas()" class="btn btn-outline-success" class="form-control ml-2 mt-5">Chercher</button>
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