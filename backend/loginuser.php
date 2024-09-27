<?php
session_start();
include "./dbConfig.php";
function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
}
if (isset($_POST['useradmno']) && isset($_POST["userpassword"])){
    $userregno = clean_input($_POST["useradmno"]);
    $userpassowrd = $conn->real_escape_string($_POST["userpassword"]);

    $sql = "SELECT * FROM students WHERE userregno = '$userregno'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            if (password_verify($userpassowrd,$row['userpassword'])) {
                $_SESSION['user_id'] = $row['id'];
                echo json_encode(['success' => true,"message" => "Login successfull welcome"]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Sorry the password provided do not match our records']);
            }
        }
    } else {
        echo json_encode(["success" => false,"message" => "Sorry there was a problem with logging you in. It seems like there is no user with the records provided"]);
    }
} else {
    echo json_encode(["success" => false,"message" => "There was a prblem while logging you in please make sure that you fill in all the fields in the login form please"]);
}

?>