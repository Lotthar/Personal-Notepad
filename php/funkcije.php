<?php
require_once 'connection.php'; 

function allNotes() {
    $sql = "select * from notes order by datum desc;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    }
    catch(PDOException $e){
        return ["status" => -1, "poruka" => "Nema biljeski u bazi"];
    }
}

?>