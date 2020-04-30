<?php
header('Content-Type: application/json');

const FILE = "datas.txt";
const MAX_BUFFER_TIME = 600000;

$time = time();

$takeBuffer = true;

$datas = '';

if (file_exists(FILE)) {
    $file = fopen(FILE, 'r');
    $lastUpdate = fgets($file);

    if (trim($lastUpdate) - $time < MAX_BUFFER_TIME) {
        while (!feof($file)) {
            $datas .= fgets($file);
        }
    } else {
        $takeBuffer = false;
    }
} else {
    $takeBuffer = false;
}

if (!$takeBuffer) {
    try {
        $datas = file_get_contents("https://www.ftlightradar24.com/_json/airports.php");
        if ($datas) {
            $file = fopen(FILE, 'w');
            fwrite($file, $time . "\r\n" . $datas);
        }
    } catch (Exception $e) {
        $datas = '';
        if (file_exists(FILE)) {
            $file = fopen(FILE, 'r');
            $time = fgets($file);
            while (!feof($file)) {
                $datas .= fgets($file);
            }
        }
    }
}

echo $datas;
