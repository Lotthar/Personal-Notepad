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
// Sve o biljesci 
function dajNoteData()
{
    $naslov = getParam("naslov", null, false);
    $sql = "select * from biljeske where naziv='$naslov'";
    try {
        $rez = arrayQuery($sql);
        return $rez[0];
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => $e . "Neuspjeo upit!"];
    }
}
//sve kompletne biljeske 
function allNotes()
{
    $sql = "select * from biljeske order by datum desc;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    } catch (PDOException $e) {
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}
// sva imena biljeski
function allNotesNames()
{
    $sql = "select naziv from biljeske;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    } catch (PDOException $e) {
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}

// vraca tekst biljeske sa odredjenim nazivom 
function dajTekst()
{
    $naslov = getParam("naslov", null, false);
    $sql = "select tekst from biljeske where naziv='$naslov';";
    try {
        $rez = arrayQuery($sql);
        return $rez[0];
    } catch (PDOException $e) {
        return ["status" => -1, "poruka" => "Nema biljeske u bazi"];
    }
}

// Cuvanje biljeske
function saveBiljeska()
{
    $naslov = getParam("naslov", null, false);
    $bold = getParam("bold", null, false);
    $italic = getParam("italic", null, false);
    $under = getParam("under", null, false);
    $boja = getParam("boja", null, false);
    $font = getParam("font", null, false);
    $datum = getParam("datum", null, false);
    $tekst = getParam("tekst", null, false);
    $sql = "Insert into biljeske (naziv,datum,bold,italic,under,font,boja,tekst) values ('$naslov','$datum','$bold','$italic','$under','$font','$boja','$tekst');";
    try {
        query($sql);
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska pri insertovanju" + $e];
    }
}
// Update biljeske 
function updateBiljeska()
{
    $naslov = getParam("naslov", null, false);
    $bold = getParam("bold", null, false);
    $italic = getParam("italic", null, false);
    $under = getParam("under", null, false);
    $boja = getParam("boja", null, false);
    $font = getParam("font", null, false);
    $datum = getParam("datum", null, false);
    $tekst = getParam("tekst", null, false);
    $sql = "Update biljeske set datum='$datum',bold='$bold',italic='$italic',under='$under',font='$font',boja='$boja',tekst='$tekst' where naziv='$naslov';";
    try {
        query($sql);
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska prilikom update-a" + $e];
    }
}
// Brisanje biljeske
function deleteBiljeska()
{
    $naslov = getParam("naslov", null, false);
    $sql = "Delete from biljeske where naziv='$naslov';";
    try {
        query($sql);
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska prilikom brsianja" + $e];
    }
}
