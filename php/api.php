<?php
require_once 'funkcije.php';

function notepadApi(){
    if(isset($_REQUEST["method"])){
        switch($_REQUEST["method"]){
            // metode za requestove
            default: return error();
        }
    } else {
        return error();
    }
}

function error() {
    return ["status" => -5, "poruka" => "Metod ili objekat kome pristupate ne postoji."];
}

echo json_encode(api());
?>