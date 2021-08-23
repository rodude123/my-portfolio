<?php
////////////////// Index file //////////////
/// Creates base routes and runs         ///
/// respective functions                 ///
////////////////////////////////////////////
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

//require “routes.php”;
require "../vendor/autoload.php";
include "timelineData.php"; 

// Start slim
$app = AppFactory::create();
// create middleware
$app->addRoutingMiddleware();

// for error checking
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->setBasePath("/api");

$timelineData = new TimelineData();

$app->get(“/timelineData”, function (Request $request, Response $response)
{
    $result = $timelineData->getTimelineData();
    
    $json = json_encode($result);
    
    $response->getBody()->write($json);
    
    return $response->withHeader("Content-Type", "application/json");
});

$app->run();
