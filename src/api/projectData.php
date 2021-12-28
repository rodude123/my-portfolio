<?php
namespace api;
use PDO;

require_once "./config.php";

/**
 * Project Data Class
 * Define all functions which either get, update, create or delete timeline data
 */
class projectData
{
    function getProjectData()
    {
        $conn = dbConn();
        $stmt = $conn->prepare("SELECT title, isMainProject, information, imgLocation, projectLink, githubLink FROM projects order by date LIMIT 4;");
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result)
        {
            return $result;
        }
        else
        {
            return array(array("errorMessage" => "Error, project data not found"));
        }
    }
}