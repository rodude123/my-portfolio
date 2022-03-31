<?php
session_start();
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
use Selective\SameSiteCookie\SameSiteCookieConfiguration;
use Slim\Factory\AppFactory;
use Selective\SameSiteCookie\SameSiteCookieMiddleware;

// Start slim
$app = AppFactory::create();
// create middleware
$app->addRoutingMiddleware();

$ssConfig = new SameSiteCookieConfiguration(["same_site" => "strict"]);

// add in same site cookie stuff
$app->add(new SameSiteCookieMiddleware($ssConfig));

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
    //if it is an error give a 404 code since it can't find the data
    if(array_key_exists("errorMessage", $result))
    {
        $response = $response->withStatus(404);
    }

    //use content type json to indicate json data on frontend.
    return $response->withHeader("Content-Type", "application/json");
});

$app->get('/projectData', function (Request $request, Response $response)
{
    global $projectData;

    $result = $projectData->getProjectData();

    $json = json_encode($result);

    $response->getBody()->write($json);

    if(array_key_exists("errorMessage", $result))
    {
        $response = $response->withStatus(404);
    }

    //use content type json to indicate json data on frontend.
    return $response->withHeader("Content-Type", "application/json");
});

$app->post('/contact', function (Request $request, Response $response)
{
    $data = $request->getParsedBody();
    if(empty($data["fName"]) || empty($data["lName"]) || empty($data["email"]) || empty($data["subject"]) || empty($data["message"]))
    {
      $response->getBody()->write(json_encode(array("errorMessage" => "Please fill out all the fields")));
      $response = $response->withStatus(400);
      return $response->withHeader("Content-Type", "application/json");
    }
    
    if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) 
    {
      $response->getBody()->write(json_encode(array("errorMessage" => "Email is not the correct format")));
      $response = $response->withStatus(400);
      return $response->withHeader("Content-Type", "application/json");
    }
    
    // email form filler/conatcter
    $headers1 = "From: noreply@rohitpai.co.uk\r\n";
    $headers1 .= "Reply-To: rohit@rohitpai.co.uk\r\n";
    $headers1 .= "MIME-Version: 1.0\r\n";
    $headers1 .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $message1 = "
    <html lang=\"en\">
    <head>
    <title>{$data['subject']}</title>
    <style>
        @import url(\"https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Share+Tech+Mono&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap\");
        body {
            font-family: Noto Sans KR, sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: var(--generalFS);
            line-height: 1.625rem;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        table td, table th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        
        table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        table tr:hover {
            background-color: #ddd;
        }
        
        table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: hsla(79, 62%, 59%, 1);
            color: white;
        }
        
        hr {
            border-color: hsla(0, 0%, 78%, 1);
        }
    </style>
    </head>
    <body>
        <p>Thank you for filling out the form on my website, I will try to respond to your query as soon as I can.</p>
        <br>
        <p>Below is what you filled in for your record</p>
        <table>
            <thead>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Subject</th>
                <th>message</th>
            </thead>
            <tr>
                <td>{$data['fName']}</td>
                <td>{$data['lName']}</td>         
                <td><a href=\"mailto:{$data['email']}\">{$data['email']}</a></td>
                <td>{$data['subject']}</td>
                <td>{$data['message']}</td>
            </tr>
        </table>
        <br>
        <hr>
        <p>Regards, <br> Rohit Pai <br> <a href=\"mailto:rohit@rohitpai.co.uk\">rohit@rohitpai.co.uk</a>
    </body>
    </html>
    ";
    
    mail($data["email"], $data["subject"], $message1, $headers1);
    
    // email to me
    $headers2 = "From: noreply@rohitpai.co.uk\r\n";
    $headers2 .= "Reply-To: {$data['email']}\r\n";
    $headers2 .= "MIME-Version: 1.0\r\n";
    $headers2 .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $message2 = "
    <html lang=\"en\">
    <head>
    <title>{$data['subject']}</title>
    <style>
        @import url(\"https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Share+Tech+Mono&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap\");
        body {
            font-family: Noto Sans KR, sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: var(--generalFS);
            line-height: 1.625rem;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        table td, table th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        
        table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        table tr:hover {
            background-color: #ddd;
        }
        
        table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: hsla(79, 62%, 59%, 1);
            color: white;
        }
        
        hr {
            border-color: hsla(0, 0%, 78%, 1);
        }
    </style>
    </head>
    <body>
        <p>{$data['fName']} {$data['lName']} filled in the form on the website, here is what they sent.</p>
        <table>
            <thead>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Subject</th>
                <th>message</th>
            </thead>
            <tr>
                <td>{$data['fName']}</td>
                <td>{$data['lName']}</td>         
                <td><a href=\"mailto:{$data['email']}\">{$data['email']}</a></td>
                <td>{$data['subject']}</td>
                <td>{$data['message']}</td>
            </tr>
        </table>
    </body>
    </html>
    ";
    
    mail("rohit@rohitpai.co.uk", "{$data['fName']} {$data['lName']} filled in the form", $message2, $headers2);
    return $response->withStatus(201);
});

$app->run();
