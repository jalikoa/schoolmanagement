<?php

include "./dbConfig.php";
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}
if (isset($_POST["username"]) && isset($_POST["useremail"]) && isset($_POST["usercontact"]) && isset($_POST["useradmno"]) && isset($_POST["usergender"]) && isset($_POST["userpassword"]) ){
    $username = clean_input($_POST["username"]);
    $userclass = clean_input($_POST["userclass"]);
    $useremail = clean_input($_POST["useremail"]);
    $usercontact = clean_input($_POST["usercontact"]);
    $userregno = clean_input($_POST["useradmno"]);
    $usergender = clean_input($_POST["usergender"]);
    $userpassword = password_hash($_POST["userpassword"],PASSWORD_BCRYPT);
    $sql = "SELECT * FROM students WHERE useremail = '$useremail' OR usercontact = '$usercontact' OR userregno = '$userregno'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        echo json_encode(["success" => false,"message" => "Pease check on your Email,contact or registration number we realised that a user exists with one of this credentials"]);

    }
    else {
    $sql = "INSERT INTO students (username,useremail,usergrade,usercontact,userregno,usergender,userpassword) VALUES ('$username','$useremail','$userclass','$usercontact','$userregno','$usergender','$userpassword')";
    if($conn->query($sql)){
        echo json_encode(["success" => true,"message" => "Registration is succsessful.Can now login"]);

    } else {
        echo json_encode(["success" => false,"message" => "Sorry there was an unexpected error in the registration please try again later"]);
    }}
} else {
    echo json_encode(["success" => false,"message" => "Please ensure that you fill all the fields in the form please before submitting"]);
}

?>