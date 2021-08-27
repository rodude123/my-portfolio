<?php
require_once "./config.php";

class TimelineData
{
    function getEduData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT * FROM edu;"); 
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($result)
        {
            return $result;
        }
        else 
        {
            return array("errorMessage" => "Error, edu data not found");
        }
    }
    
    function getWorkData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT * FROM work;"); 
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($result)
        {
            return $result;
        }
        else 
        {
            return array("errorMessage" => "Error, work data not found");
        }
    }
    
    
}