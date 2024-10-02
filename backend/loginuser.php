<?php
session_start();
include "./dbConfig.php";
function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
}
if (isset($_POST['useradmno']) && isset($_POST["userpassword"])){
    $userregno = clean_input($_POST["useradmno"]);
    $userpassowrd = $conn->real_escape_string($_POST["userpassword"]);
    $userRole = clean_input($_POST["userrole"]);
    if ($userRole == 'student'){
    $sql = "SELECT * FROM students WHERE userregno = '$userregno'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            if (password_verify($userpassowrd,$row['userpassword'])) {
                $_SESSION['user_id'] = $row['id'];
                echo json_encode(['success' => true,"message" => "Login successfull welcome","rd" => 1,"userid" => $row["id"]]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Incorrect password for this account']);
            }
        }
    }}
elseif ($userRole == 'teacher'){
    $sql = "SELECT * FROM teachers WHERE useremail = '$userregno'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            if (password_verify($userpassowrd,$row['password'])) {
                $_SESSION['user-id'] = $row['id'];
                echo json_encode(['success' => true,"message" => "Login successfull welcome","rd" => 2,"userid" => $row["id"]]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Incorrect password for this account']);
            }
        }
    }else {
        echo json_encode(["success" => false,"message" => "Ooops! No user exists with the records provided"]);
    }}
    else {
        echo json_encode(["success" => false,"message" => "User not found.Please choose the right role for yourself.","rd" => 0]);
    }
}

?>