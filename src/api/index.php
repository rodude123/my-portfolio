<?php
////////////////// Index file //////////////
/// Creates base routes and runs         ///
/// respective functions                 ///
////////////////////////////////////////////
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require "routes.php";
require "./vendor/autoload.php";

// Start slim
$app = AppFactory::create();
// create middleware
$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(false, true, true);

$app->get("/timelineData", function (Request $request, Response $response)
{

});
