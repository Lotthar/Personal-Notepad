<?php
require_once 'connection.php'; 

function allNotes() {
    $sql = "select * from notes;";
    $note = [];
    try {
        $rez = arrayQuery($sql);
        for($i = 0; i < count($rez); $i++){
            // zavrsiti ucitavanje svih biljeski
        }
    }
    catch(PDOException $e){
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}

?>