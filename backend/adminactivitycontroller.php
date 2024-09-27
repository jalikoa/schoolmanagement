<?php
 include "./dbConfig.php";
 function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
 }
 if (isset($_POST["addnewpayment"])){
        $regno = clean_input($_POST["admno"]);
        $amountpaid = clean_input($_POST["amountpaid"]);
        $datepaid = clean_input($_POST["datepaid"]);
        $grade = clean_input($_POST["grade"]);
        $uid = clean_input($_POST["uid"]);
        $uniqueid = rand(7,9);
        if (empty($regno) || empty($amountpaid) || empty($datepaid) || empty($grade)){
            echo json_encode(["success" => false,"message" => "Please ensure that all the fields required are filled for you to add a new payment record"]);
        } else {
            $sql = "INSERT INTO payments (payerregno,amountpaid,datepaid,grade,uid) VALUES ('$regno','$amountpaid','$datepaid','$grade','$uid')";
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
if (isset($_POST["fetchpaymentrecords"])){
    $sql = "SELECT * FROM payments";
    $results = $conn->query($sql);
    echo $results;
    if ($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            echo $row;
        }
    } else {
        echo json_encode(["success" => false,"message" => "No records found"]);
    }
}
if (isset($_POST['addassist'])){
    
}
if (isset($_POST['addteacher'])){
    
}



$conn->close();
exit();
?>