<?php
// used to connect to the database
$host = "";
$db_name = "";
$username = "";
$password = "";

try {
$con = new PDO("mysql:host={$host};dbname={$db_name}", $username, $password);
}

// show error
catch(PDOException $exception){
echo "Connection error: " . $exception->getMessage();
}
?>