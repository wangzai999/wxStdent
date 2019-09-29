<?php
    $myFile = fopen("pcas-code.json", "r") or die("can't open file");
    echo fread($myFile, filesize("pcas-code.json"));
    fclose($myFile);