<?php
if($_POST){

// include database connection
include 'config/connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
//header('Content-Type: application/json');

try{

// insert query
$query = "INSERT INTO register VALUES (:name,:email,:city,:address,:gender,:password,:dob,:dor,:profileid)";
// prepare query for execution
$stmt = $con->prepare($query);
// posted values
$name = $_POST['name'];
$email = $_POST['email'];
$city = $_POST['city'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$address = $_POST['address'];
$password = $_POST['password'];
$dor = date("d-m-Y");
$profileid = mt_rand(100000,999999);

// bind the parameters
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':city', $city);
$stmt->bindParam(':gender', $gender);
$stmt->bindParam(':dob', $dob);
$stmt->bindParam(':dor', $dor);
$stmt->bindParam(':profileid', $profileid);
// Execute the query
if($stmt->execute()){
echo json_encode(array('result'=>'success'));
}else{
echo json_encode(array('result'=>'fail'));
}
}
// show error
catch(PDOException $exception){
die('ERROR: ' . $exception->getMessage());
}
}
?>