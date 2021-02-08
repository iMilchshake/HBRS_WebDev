<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<style>
    fieldset {
        width: 1px;
    }
</style>
<body>

<h2> Register </h2>
<form method="post">
    <fieldset>
        <label for="user">user:</label><br>
        <input type="text" id="user" name="user"><br>
        <label for="pass">pass:</label><br>
        <input type="password" id="pass" name="pass"><br><br>
        <input type="submit" id="button" value="Submit">
    </fieldset>
</form>

<?php
    if(isset($_POST['user']) && isset($_POST['pass'])) {
        $user = $_POST['user'];
        $pass = $_POST['pass'];

        $file = './raw_passwords.csv';
        $new_line = $user . ',' . $pass . "\n";

        if(file_put_contents($file, $new_line, FILE_APPEND | LOCK_EX)) {
            echo "<script> alert('added new user')</script>";
        } else {
            echo "<script> alert('error while adding new user!')</script>";
        }

    } else {
    }
?>

</body>
</html>