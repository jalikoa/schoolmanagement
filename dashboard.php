 <?php
 session_start();
if (!isset($_SESSION['user_id'])){
 header("location:login.html");
}
$userid = $_SESSION['user_id'];
echo "<input style='display:none;' id='userId' value='$userid' disabled>";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jalsoft school management system dashboard</title>
</head>

<link rel="stylesheet" href="./assets/css/style.css">
<link rel="stylesheet" href="./assets/css/bootstrap.min.css">
<link rel="stylesheet" href="./assets/css/styles.css">
<link rel="stylesheet" href="./assets/css/font-awesome.min.css">
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
   
    <div class="container">
        <div class="row">
            <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                <img src="./assets/img/logo.png" style="width: 80px;">
            </div>
            <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                <h2 class="text-muted text-primary">Students dashboard</h2>
            </div>
            <div class="col-xs-11 col-sm-5 col-md-5 col-lg-4 col-xl-4 student-card">
                <h4 class="text-secondary">Student's Bio</h4>
                <span class="text-info lead">Name: </span><span id="username"></span><br>
                <span class="text-info lead">Reg No: </span><span class="" id="useradmno"></span><br>
                <span class="text-info lead">Class: </span><span class="" id="usergrade"></span><br>
                <span class="text-info lead">Email: </span><span class="" id="useremail"></span><br>
                <span class="text-info lead">Contact: </span><span class="" id="userphone"></span><br><br>
                <button class="btn btn-primary">Edit profile</button>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-5 col-lg-4 col-xl-4 student-card">
            <h4 class="text-secondary">Student's Fee Info</h4>
            <span class="text-info lead">Total fees: </span><span class="" id="totalfees"></span><br>
            <span class="text-info lead">Amount paid: </span><span class="" id="amountpaid"></span><br>
            <span class="text-info lead">Balance: </span><span class="text-warning" id="balance"></span><br>
            <div class="btn-group">
                <button type="button" class="btn btn-success">Pay</button>
                <button type="button" class="btn btn-secondary">Receipt</button>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        History
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                     <li><a href="#">History 1</a></li>
                    <li><a href="#">History 2</a></li>
                </ul>
            </div>

            </div>
            <div class="col-xs-10 col-sm-5 col-md-5 col-lg-3 col-xl-3 student-card">
                <h4 class="text-secondary">Academic report</h4>
                <span class="text-info lead">Score: </span><span class="" id="studentscore"><sup>410</sup>/<sub>500</sub></span><br>
                <span class="text-info lead">Class Position: </span><span class="" id="classposition"><sup>4</sup>/<sub>56</sub></span><br>
                <span class="text-info lead">Overall position: </span><span class="" id="overallposition"><sup>9</sup>/<sub>230</sub></span><br>
                <span class="text-info lead">Remarks: </span><span class="text-primary" id="classteacherremarks">Good job.Keep it up</span><br>
                <button class="btn btn-success">Get slip</button>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-5 col-lg-4 col-xl-4 student-card">
                <h5 class="text-warning">Notifications</h5>
                <div class="alert alert-info">No Notifications available the school will pass notifications through this card</div>
            </div>
        </div>

        <!--- This is the beginning of the services that are offered by the school not limited to library services and more--->
        <div class="row student-card">
            <div class="col-xs-10 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h5 class="text-secondary">School services</h5>
                    <div class="student-card">
                        <h6 class="text-primary">Library</h6>
                        <div class="alert alert-success">
                            Congratulations you have been shortlisted as one of the best academicians who have contributed alot to the library and you are kindly invited to attedn the celebration in the library tommorrow
                        </div>
                    </div>
            </div>
            <div class="col-xs-10 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <h5 class="text-secondary">History and Analytics</h5>
                <label class="text-primary text-muted" for="analyticsoption">Choose service to get history about</label>
                        <br>
                    <div class="input-group">
                        <select name="anlyticsoption" id="analyticsoption" class="form-control">
                            <option value="fees">Fee payment</option>
                            <option value="perfomance">Academics</option>
                            <option value="library">Library Services</option>
                        </select>
                        <span class="input-group-addon"><button class="btn btn-primary">Get</button></span>
                    </div>
                    <br>
                    <canvas id="myChart"></canvas>
            </div>
        </div>
    </div>
</body>
<script src="./assets/js/chart.js"></script>
<script src="./assets/js/general.js"></script>
<script src="./assets/js/drawchart.js"></script>
<script src="./assets/js/studentdashboardhandler.js"></script>
</html>