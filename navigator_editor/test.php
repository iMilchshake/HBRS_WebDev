<?php
// receive and parse json data
header("Content-Type: application/json");
$data = file_get_contents("php://input");
$json = json_decode($data, true);

// catch errors
$jsonError = json_last_error();
$jsonErrorMsg = json_last_error_msg();

// send answer
if ($jsonError === 0) {

    // save json
    $file_content = json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents("file_new.json", $file_content);

    echo json_encode("{\"status\": \"success\"}");
} else {
    echo json_encode("{\"error\": $jsonError, \"msg\": $jsonErrorMsg, \"recieveddata\": $data}");
}
?>