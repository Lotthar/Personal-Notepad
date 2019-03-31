<?php
require_once 'connection.php';
// Vraca parametar iz zahtjeva ako je postavljen
function getParam($param, $defaultValue, $stop)
{
    if (isset($_REQUEST[$param]))
        return $_REQUEST[$param];
    else {
        if ($stop) {
            echo json_encode(error());
            exit();
        } else {
            return $defaultValue;
        }
    }
}

//sve kompletne biljeske 
function allNotes() {
    $sql = "select * from biljeske order by datum desc;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    }
    catch(PDOException $e){
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}
// sva imena biljeski
function allNotesNames() {
    $sql = "select naziv from biljeske;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    } catch(PDOException $e){
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}

// vraca tekst biljeske sa odredjenim nazivom 
function dajTekst(){
    $naslov = getParam("naslov",null,false);
    $sql = "select tekst from biljeske where naziv='$naslov';";
    try {
        $rez = arrayQuery($sql);
        return $rez[0];
    } catch(PDOException $e){
        return ["status" => -1, "poruka" => "Nema biljeske u bazi"];
    }
}

?>