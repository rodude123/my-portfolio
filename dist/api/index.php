<?php
////////////////// Index file //////////////
/// Creates base routes and runs         ///
/// respective functions                 ///
////////////////////////////////////////////
//require “routes.php”;
require "../vendor/autoload.php";
include "timelineData.php";
include "projectData.php";
use api\projectData;
use api\timelineData;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Start slim
$app = AppFactory::create();
// create middleware
$app->addRoutingMiddleware();

// for error checking
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->setBasePath("/api");

$timelineData = new timelineData();
$projectData = new projectData();

$app->get("/timelineData/{timeline}", function (Request $request, Response $response, array $args)
{
    global $timelineData;
    $json = $result = "";

    //check if route is available if it is get the data
    //otherwise return an error
    if($args["timeline"] == "edu")
    {
        $result = $timelineData->getEduData();
    }
    else if($args["timeline"] == "work")
    {
        $result = $timelineData->getWorkData();
    }
    else
    {
        $result = array(array("errorMessage" => "Error, timeline data not found"));
    }

    $json = json_encode($result);

    $response->getBody()->write($json);
    return $response;
//    //if it is an error give a 403 code since it can't find the data
//    if(array_key_exists("errorMessage", $result[-1]))
//    {
//        $response = $response->withStatus(403);
//    }
//
//    //use content type json to indicate json data on frontend.
//    return $response->withHeader("Content-Type", "application/json");
});

$app->get('/projectData', function (Request $request, Response $response)
{
    global $projectData;

    $result= $projectData->getProjectData();

    $json = json_encode($result);

    $response->getBody()->write($json);

    if(array_key_exists("errorMessage", $result[-1]))
    {
        $response = $response->withStatus(403);
    }

    //use content type json to indicate json data on frontend.
    return $response->withHeader("Content-Type", "application/json");
});

$app->run();
