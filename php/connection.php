<?php

$db = null;
$stmt = null;

$base_url = "http://192.168.5.2/NotepadJS/";

$db_host = "localhost";
$db_name = "notepad";
$db_username = "root";
$db_password = "";

function getConnection()
{
    global $db, $db_host, $db_name, $db_username, $db_password;
    try {
        if (!$db) {
            $db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8;", "$db_username", "$db_password", array(
                PDO::MYSQL_ATTR_FOUND_ROWS => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ));
        }
        return $db;
    } catch (PDOException $e) {
        return ($db = null);
    }
}
function arrayQuery($sql)
{
    global $db, $stmt;
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function query($sql)
{
    global $db, $stmt;
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
