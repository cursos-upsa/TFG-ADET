<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

// Set maximum execution time to 240 seconds,
// for when a response from the OpenAI API takes longer.
ini_set('max_execution_time', 240);

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
