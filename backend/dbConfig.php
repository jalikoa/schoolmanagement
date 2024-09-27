<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'feeforum';

$conn = new mysqli($hostname,$username,$password,$database);
if ($conn->connect_error){
    die("Conection to the data base failed: ".$conn->connect_error);
}

?>