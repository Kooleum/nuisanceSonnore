<?php
header('Content-Type: application/json');

$datas = file_get_contents("https://www.flightradar24.com/_json/airports.php");

echo $datas;