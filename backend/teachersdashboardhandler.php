<?php
include "dbConfig.php";
function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
}

if (isset($_POST["editprofile"])){
    $useremail = clean_input($_POST["useremail"]);
    $newname = clean_input($_POST["newname"]);
    $newemail = clean_input($_POST["newemail"]);
    $newphone = clean_input($_POST["newphone"]);
    $userpassword = $conn->real_escape_string($_POST["userpassword"]);

    $sql = "SELECT * FROM teachers WHERE useremail = '$useremail'";
    $results = $conn->query($sql);
    if ($results){
        $row = $results->fetch_assoc();
        if (password_verify($userpassword,$row["password"])){
                $sql = "UPDATE teachers SET username = '$newname',useremail = '$newemail',usercontact = '$newphone'";
                if ($conn->query($sql)){
                    echo json_encode(["success" => true,"message" => "Profile was succesfully updated"]);
                }  
        } else {
            echo json_encode(["success" => false,"message" => "Sorry could not update the changes it looks like you have given an incorrect password for this account"]);
        }
    } else {
        echo json_encode(["success" => false,"message" => "Sorry there was a problem while trying to fetch you in the database for the updates it seems like no user exists with your initial records"]);
    }
}

if (isset($_POST["createnotification"])){
    $notificationsender = clean_input($_POST["notificationsender"]);
    $notificationtitle = clean_input($_POST["notificationtarget"]);
    $notificationmessage = clean_input($_POST["notificationmessage"]);
    $notificationtype = clean_input($_POST["notificationtype"]);
    $notificationcategory = clean_input($_POST["notificationcategory"]);
    if (!empty($notificationmessage) && !empty($notificationsender) && !empty($notificationtitle) && !empty($notificationtype) && !empty($notificationcategory)){
            $sql = "INSERT INTO notifications (notificationtitle,notificationtype,notificationsender,notificationmessage,notificationcategory) VALUES ('$notificationtitle','$notificationtype','$notificationsender','$notificationmessage','$notificationcategory')";
            if ($conn->query($sql)){
                echo json_encode(["success" => true,"message" => "Notification added successfully"]);
                // Add the logics here for the users to get real time alerts of newer notifications
            } else {
                echo json_encode(["success" => false,"message" => "An unxpected error occurred while trying to add your notifications to records please try again later"]);
            }
    } else {
        echo json_encode(["success" => false,"Message" => "There was a problem while adding your notification to the record please ensure all the field that are in the form are filled"]);
    }
}

if (isset($_POST["fetchstudentslist"])){
    $teacheremail = clean_input($_POST["teachersemail"]);
    function getClass($teacheremail,$db){
        $sql = "SELECT * FROM teachers WHERE useremail = '$teacheremail'";
        $results = $db->query($sql);
        if ($results){
            if($results->num_rows > 0){
                $row = $results->fetch_assoc();
                return $row["class"];
            }
        }
    }
    $studentclass = getClass($teacheremail,$conn);
    $sql = "SELECT id,username,useremail,userregno,usercontact FROM students WHERE usergrade = '$studentclass'";
    $results = $conn->query($sql);
    if ($results){
        if($results->num_rows > 0){
            while ($row = $results->fetch_assoc()){
                $students[] = $row;
            }
            echo json_encode(["success" => true,"message" => "Students list was succefully updated","list" => $students]);
        } else {
            echo json_encode(["success" => false,"message" => "Sorry it looks like there is no student for your class please please refresh the page and if the issue persits please try adding new students please"]);
        }
    }  else {
        echo json_encode(["success" => false,"message" => "Sorry an unxpected error occurred while trying to search for the students in your class please try again later"]);
    }
}
if (isset($_POST['deletestudent'])){
    $id = clean_input($_POST["studentid"]);
    $sql = "DELETE FROM students WHERE id = '$id'";
    $results = $conn->query($sql);
    if ($results){
        echo json_encode(["success" => true,"message" => "Student was successfully deleted from the record"]);
    } else {
        echo json_encode(["success" => false,"message" => "Could not delete the student please consider trying again later"]);
    }
}
if (isset($_POST["fetchTeachersInfo"])){
    $id = clean_input($_POST["teacherid"]);
    $sql = "SELECT username,useremail,usercontact,class FROM teachers WHERE id = '$id'";
    $results = $conn->query($sql);
    if ($results){
        while ($row = $results->fetch_assoc()){
            $credentials[] = $row; 
        }
        echo json_encode(["success" => true,"credentials" => $credentials]);
    } else {
        echo json_encode(["success" => false,"message" => "Please consider loging in again there was a problem while fetching your data from the database.When this happens you can consider refreshing the page or loging in again"]);
    }
}
$conn->close();
?>