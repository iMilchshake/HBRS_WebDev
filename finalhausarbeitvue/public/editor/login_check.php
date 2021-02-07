<?php

// fetch session data
session_start();
$login = isset($_SESSION["login"]) && $_SESSION["login"];

// test if user is logged in
if($login) {
    echo "{\"login\": \"True\"}";
} else {
    echo "{\"login\": \"False\"}";
}

?>