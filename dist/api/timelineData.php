<?php
namespace api;
use PDO;

require_once "./config.php";

/**
 * TimelineData class
 * Define all functions which either get, update, create or delete timeline data
 */
class timelineData
{
    function getEduData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT DATE_FORMAT(startPeriod, '%b, %Y') as startPeriod, DATE_FORMAT(endPeriod, '%b, %Y') as endPeriod, grade, course  FROM edu ORDER BY startPeriod DESC;");
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($result)
        {
            return $result;
        }
        else 
        {
            return array(array("errorMessage" => "Error, edu data not found"));
        }
    }
    
    function getWorkData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT DATE_FORMAT(startPeriod, '%b, %Y') as startPeriod, DATE_FORMAT(endPeriod, '%b, %Y') as endPeriod, companyName, area, title  FROM work ORDER BY work.startPeriod DESC;");
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($result)
        {
            return $result;
        }
        else 
        {
            return array(array("errorMessage" => "Error, work data not found"));
        }
    }
    
    
}
