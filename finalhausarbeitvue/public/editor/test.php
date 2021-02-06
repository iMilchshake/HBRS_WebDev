<?php
// fetch session data
session_start();
$login = isset($_SESSION["login"]) && $_SESSION["login"];

// test if user is logged in
if(!$login) {
    echo "{\"status\": \"error\",
     \"error\": \"inavlid login\"}";
}
else {
    // receive and parse json data
    header("Content-Type: application/json");
    $data = file_get_contents("php://input");
    $json = json_decode($data, true);

    // catch errors
    $jsonError = json_last_error();
    $jsonErrorMsg = json_last_error_msg();

    // send answer and save json
    if ($jsonError === 0) { // success
        $file_content = json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents("../exercises.json", $file_content);
        echo "{\"status\": \"success\"}";
    } else { // error
        echo "{\"status\": \"error\",
         \"error\": \"$jsonError\",
          \"msg\": \"$jsonErrorMsg\",
           \"received-data\": \"$data\"}";
    }
}
?>