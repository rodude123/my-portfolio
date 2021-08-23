<?php
require_once "./confjg.php";

class TimelineData
{
    function getTimelineData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT * FROM timeline;"); 
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($result)
        {
            return $result;
        }
        else 
        {
            return array("errorMessage" => "Error timeline data not found");
        }
          
    }
}