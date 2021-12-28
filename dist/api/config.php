<?php
//////////// Config file /////////////////////
/// Used for storing important information ///
/// such as passwords, usernames etc.      ///
//////////////////////////////////////////////

function dbConn(): PDO|string
{
    $host = "localhost";
    $dbName = "u987021215_cms";
    $username = "u987021215_rodude123";
    $password = "pFHS5qKhkyaDumgf";
    try
    {
        return new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    }
    catch (PDOException $e)
    {
        return "Connection failed: " . $e->getMessage();
    }
}