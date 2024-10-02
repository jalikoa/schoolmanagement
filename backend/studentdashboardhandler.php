<?php
include "dbConfig.php";

function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
}
if (isset($_POST["loadcredetials"])){
    $userid = clean_input($_POST["userid"]);

    $sql = "SELECT * FROM students where id = '$userid'";
    $results = $conn->query($sql);
    if ($conn->query($sql)){
        $row = $results->fetch_assoc();
        echo json_encode(["success" => true,"userName" => $row["username"],"userRegNo" => $row["userregno"],"userGrade" => $row["usergrade"],"userEmail" => $row["useremail"],"userContact" => $row["usercontact"]]);

    } else {
        echo json_encode(["success" => false,"Message" => "It seems like there was an error when fetching your user credentials"]);
    }

}
if (isset($_POST["fetchfeeinformation"])){
    $userid = clean_input($_POST["userid"]);
    function getRegNo($id,$conn){
        $sql = "SELECT * FROM students where id = '$id'";
        $results = $conn->query($sql);
        $row = $results->fetch_assoc();
        return $row["userregno"];
    }
    function getGrade($id,$conn){
        $sql = "SELECT * FROM students where id = '$id'";
        $results = $conn->query($sql);
        $row = $results->fetch_assoc();
        return $row["usergrade"];
    }
    $userreg = getRegNo($userid,$conn);
    $sql = "SELECT * FROM payments where payerregno = '$userreg'";
    $results = $conn->query($sql);
    if ($results){
        if($results->num_rows > 0){
            $row = $results->fetch_assoc();
            echo json_encode(["success" => true,"amountPaid" => $row["amountpaid"],"userGrade" => $row["grade"]]); 
        } else {
            echo json_encode(["success" => true,"amountPaid" => 0,"userGrade" => getGrade($userid,$conn)]);
        }
    } else {
        echo json_encode(["success" => false,"Message" => "It seems like there was an error when fetching your user credentials"]);
    }
}
if (isset($_POST["fetchnot"])){
    $sql = "SELECT * FROM notifications";
    $results = $conn->query($sql);
    if ($results){
        if($results->num_rows > 0){
            while($row = $results->fetch_assoc()){
                $notification[] = $row;
            }
            echo json_encode(["success" => true,"notifications" => $notification]);
        }
    }
}
?>