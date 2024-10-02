<?php
 include "./dbConfig.php";
 function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
 }
 if (isset($_POST["addnewpayment"])){
        $regno = clean_input($_POST["admno"]);
        $name = clean_input($_POST["name"]);
        $amountpaid = clean_input($_POST["amountpaid"]);
        $datepaid = clean_input($_POST["datepaid"]);
        $grade = clean_input($_POST["grade"]);
        $uid = clean_input($_POST["uid"]);
        $uniqueid = rand(7,9);
        if (empty($regno) || empty($amountpaid) || empty($datepaid) || empty($grade)){
            echo json_encode(["success" => false,"message" => "Please ensure that all the fields required are filled for you to add a new payment record"]);
        } else {
            $sql = "INSERT INTO payments (payerregno,name,amountpaid,datepaid,grade,uid) VALUES ('$regno','$name','$amountpaid','$datepaid','$grade','$uid')";
            if ($conn->query($sql)){
                echo json_encode(["success" => true, "message" => "Payment record has been created successsfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Payment record has not been created try again later"]);
            }
        }
        

 } 
 if (isset($_POST["editpayment"])){

 }
 if (isset($_POST["deletepayment"])){

 }
 if (isset($_POST['fetch_stat'])){
    $sql = "SELECT * FROM payments";
    $results = $conn->query($sql);
    if ($results){
        $totalpayments = $results->num_rows;
        while($row = $results->fetch_assoc()){
            $totalamount[] = $row["amountpaid"];
        }
        echo json_encode(["success" => true,"totalpaid" => $totalamount,"sumstudent" => $totalpayments]);
    }
 }
if (isset($_POST["fetchpay"])){
    $sql = "SELECT * FROM payments";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            $students[] = $row;
        }
        echo json_encode(["success" => true,"list" => $students]);
    } else {
        echo json_encode(["success" => false,"message" => "No records found"]);
    }
}
if (isset($_POST['addassist'])){
    
}
if (isset($_POST['addteacher'])){
    $teacherName = clean_input($_POST["teachername"]);
    $teacherEmail = clean_input($_POST["teacheremail"]);
    $teacherClass = clean_input($_POST["teacherclass"]);
    $teacherPhone = clean_input($_POST["teacherphone"]);
    $teacherPassword = password_hash(clean_input($_POST["teacherpassword"]),PASSWORD_BCRYPT);
    $sql = "SELECT * FROM teachers WHERE username = '$teacherName' OR useremail = '$teacherEmail' OR usercontact = '$teacherPhone'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        echo json_encode(["success" => false,"message" => "Teacher exists with these credentials"]);
    } else {
        $sql = "INSERT INTO teachers (username,useremail,class,usercontact,password) VALUES ('$teacherName','$teacherEmail','$teacherClass','$teacherPhone','$teacherPassword')";
        $results = $conn->query($sql);
        if ($results){
            echo json_encode(["success" => true,"message" => "Teacher added"]);
        } else {
            echo json_encode(["success" => false,"message" => "An error occurred"]);
        }
    }
}
if (isset($_POST["deletestudent"])){
    $studentid = clean_input($_POST["studentid"]);
    $sql = "SELECT * FROM payments WHERE id = '$studentid'";
    $results = $conn->query($sql);
    if ($results->num_rows > 0){
        $sql = "DELETE FROM payments WHERE id = '$studentid'";
        $results = $conn->query($sql);
        if ($results){
            echo json_encode(["success" => true,"message" => "Student deleted succesfully"]);
        } else {
            echo json_encode(["success" => false,"message" => "Uknown error occurred. Try again later please"]);
        }
    }
    else {
        echo json_encode(["success" => false,"message" => "Sorry there is no record in the database for this student consider refreshing your browser"]);
    }

}
if (isset($_POST["getReport"])){

}

$conn->close();
exit();
?>