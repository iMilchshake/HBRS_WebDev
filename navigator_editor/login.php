<?php

// receive and parse json data
header("Content-Type: application/json");
$data = file_get_contents("php://input");
$json = json_decode($data, true);

session_start();
if($json['user'] === "admin" && $json['pass'] === "admin") {
    // start a session to save login-state
    $_SESSION["login"] = True;
    echo "{\"status\": \"success\"}";
} else { // error
    $_SESSION["login"] = False;
    echo "{\"status\": \"error\",
     \"error\": \"invalid login\"}";
}
?>