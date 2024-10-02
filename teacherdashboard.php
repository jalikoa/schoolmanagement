<?php
 session_start();
 if (!isset($_SESSION['user-id'])){
  header("location:login.html");
 } else { 
    if(isset($_GET["user_id"])){
        if(!empty($_GET["user_id"])){
    $userid = $_GET['user_id'];
    echo "<input type='text' class='none' id='teachersid' value='$userid' disabled>";
        } else {
            header("location:login.html"); 
        }
    } else {
        header("location:login.html"); 
    }
 }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JalSoft school management system teachers dashboard</title>
</head>
<link rel="shortcut icon" href="./assets/img/logo.png" type="image/x-icon">
<link rel="stylesheet" href="./assets/css/bootstrap.min.css">
<link rel="stylesheet" href="./assets/css/font-awesome.min.css">
<link rel="stylesheet" href="./assets/css/style.css">
<link rel="stylesheet" href="./assets/css/styles.css">
<style>
</style>
<body>


    <div class="none" id="confirmation-popup">
        
    </div>

    <div id="mobile-menu-open" class="shadow-large">
       <i class="fa fa-bars" aria-hidden="true"></i>
   </div>

   <!-- End #mobile-menu-toggle -->
   <header>
       <div id="mobile-menu-close">
           <span>Close</span> <i class="fa fa-times" aria-hidden="true"></i>
       </div>
       <ul id="menu" class="shadow">
           <li>
               <a href="#main-content">Payments</a>
           </li>
           <li>
               <a href="#report-section">Reports</a>
           </li>
           <li>
               <a href="#education">Education</a>
           </li>
           <li>
               <a href="#projects">Projects</a>
           </li>
           <li>
               <a href="#skills">Skills</a>
           </li>
           <li>
               <a href="#contact">Contact</a>
           </li>
       </ul>
   </header>
   <div id="modal-container" class="none">
       <center>
            <div class="col-xs col-sm-6 col-md-5 col-lg-3 col-xl-3 student-card" id="modal-modal">
                <br>
                <!-----This is the modal where the input fields for doing the specified activity will be populated --------->
            </div>
        </center>
   </div>

    <div class="container">
        <div class="row">
                <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                    <img src="./assets/img/logo.png" style="width: 80px;">
                </div>
                <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                    <h2 class="text-muted text-primary">Teachers dashboard</h2>
                </div>  
                <div class="col-xs-11 col-sm-5 col-md-5 col-lg-4 col-xl-4 student-card">
                    <h4 class="text-secondary">My bio</h4>
                    <span class="lead text-info">Name: </span><span class="text-secondary" id="teacherpronoun"></span><br>
                    <span class="lead text-info">Class: </span><span class="text-secondary" id="teacherclass"></span><br>
                    <span class="lead text-info">Phone: </span><span class="text-secondary" id="teacherphone"></span><br>
                    <span class="lead text-info">Email: </span><span class="text-secondary" id="teacheremail"></span><br>
                    <span class="lead text-info">Total students: </span><span class="lead text-primary" id="studentssum"><b></b></span><br><br>
                    <button onclick="editProfile()" class="btn btn-primary">Edit profile</button>
                </div>
                <div class="col-xs-11 col-sm-5 col-md-5 col-lg-4 col-xl-4 student-card">
                    <h4 class="text-secondary">My Notifications <sup class="lead text-primary">1</sup></h4>
                    <span class="lead text-muted"><div class="btn-group">
                        <button class=" btn btn-secondary">Collect your books</button>
                        <button class="btn btn-danger">Delete</button>
                        <button class="btn btn-success">Edit</button>
                    </div></span><br><br>
                    <span class="lead text-muted"><div class="btn-group">
                        <button class=" btn btn-secondary">Next week exam</button>
                        <button class="btn btn-danger">Delete</button>
                        <button class="btn btn-success">Edit</button>
                    </div></span><br>
                    <br>
                    <button onclick="addNewNotification()" class="btn btn-primary">+ Add new</button>
                </div>
                <div class="col-xs-11 col-sm-5 col-md-5 col-lg-3 col-xl-3 student-card">
                    <h4 class="text-secondary">Academics</h4>
                    <span class="lead text-muted">Exams Actions</span><br>
                    <button class="btn btn-success" onclick="window.location.href = './resultsentry.html'">Record entry</button>&nbsp;<button class="btn btn-primary">Produce results</button><br><br>
                    <span class="lead text-muted">Lessons and timetable</span><br>
                    &nbsp;&nbsp;<button class="btn btn-success">Generate</button>&nbsp;<button class="btn btn-primary">My schedule</button><br><br>
                    
                </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-11 col-sm-11 col-md-11 col-lg-7 col-xl-7 student-card">
                <h3 class="text-secondary">Students list</h3>
                <div class="table-responsive">
                    <table class="table table-light table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Student's Name</th>
                                <th>Student Email</th>
                                <th>Registration number</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="teachersStudentsListTable">
                            <!--------- The list of students will be dynamically added here --------->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</body>
<script src="./assets/js/general.js"></script>
<script src="./assets/js/teachersdashboardhandler.js"></script>
</html>