<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<style>
    fieldset {
        width: 1px;
    }
</style>
<body>

<h2> Login </h2>
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
if (isset($_POST['user']) && isset($_POST['pass'])) {
    $login = $_POST['user'] . ',' . $_POST['pass'] . "\n";
    $file = './raw_passwords.csv';
    $lines = file($file);

    $success = false;
    foreach($lines as $index => $line) {
        if($line == $login) {
            $success = true;
            break;
        }
    }

    if($success) {
        echo 'success!';
    } else {
        echo 'invalid login!';
    }
}
?>

</body>
</html>