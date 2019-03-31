<?php
require_once 'funkcije.php';
header('Content-type:application/json;charset=utf-8');
http_response_code(200);

function notepadApi(){
    if(isset($_REQUEST["method"])){
        switch($_REQUEST["method"]){
            case "allNotes": return allNotes();
            case "allNotesNames": return allNotesNames();
            case "noteTekst": return dajTekst();
            default: return error();
        }
    } else {
        return error();
    }
}

function error() {
    return ["status" => -5, "poruka" => "Metod ili objekat kome pristupate ne postoji."];
}

echo json_encode(notepadApi());
?>