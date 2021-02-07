<?php

// secrets are outside of public folder
include("../../secret.php");

function hashInput($inp)
{
    global $salt;
    return hash("sha384", $inp . $salt, false);
}

function testUser($user, $pass)
{
    global $logins;
    foreach($logins as $index => $login) {
        if(hashInput($user) === $login["user"] && hashInput($pass) === $login["pass"]) {
            return true;
        }
    }
    return false;
}

// receive and parse json data
header("Content-Type: application/json");
$data = file_get_contents("php://input");
$json = json_decode($data, true);

// start session
session_start();

// test user login
if(testUser($json["user"],$json["pass"])) {
    // start a session to save login-state
    $_SESSION["login"] = True;
    echo "{\"status\": \"success\"}";
} else { // error
    $_SESSION["login"] = False;
    echo "{\"status\": \"error\",
     \"error\": \"invalid login\"}";
}
?>