<?php

    // recieve json data
    header("Content-Type: application/json");
    $v = json_decode(file_get_contents("php://input"), true);

    // send back data
    echo json_encode("{\"status\": \"success\"}");

    // save json
    $file_content = json_encode($v, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents("file.json", $file_content);
?>