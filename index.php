<?php
session_start();
if (!isset($_SESSION['user_id'])){
    header('location:login.html');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Fees Management System</title>
  <!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>-->
</head>
<link rel="manifest" href="./manifest.json">
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
    <div class="main-content" id="main-content">
            <h1>Dashboard</h1>
            <br>
            <div class="col-xs-11 col-sm-5 col-md-7 col-lg-5 col-xl-4" style="display:flex;justify-content:flex-end;"><input type="text" class="form-control" placeholder="Search by Name or Payment ID..." id="searchBar"></div>
        <div class="container"><div class="row">
            <div class="stats col-xl-4 col-lg-4 col-md-6 col-sm-11">
                <div class="stat-item">
                    <h3>Total Fees</h3>
                    <p id="totalFees">00.00</p>
                </div>
                <div class="stat-item">
                    <h3>Total Students Paid</h3>
                    <p id="studentsPaid">0</p>
                </div>
                <div class="stat-item">
                    <h3>Total Pending</h3>
                    <p id="totalPending">0</p>
                </div>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-offset-xl-3">
                <canvas id="myChart"></canvas>
            </div>
        </div></div>    
       <br>
       <div class="col-xs col-sm-8 col-md-6 col-lg-4 col-xl-4">
      <select id="classFilter" class="form-control">
      <option value="">All Classes</option>
      <option value="Primary-1">Primary 1</option>
      <option value="Primary-2">Primary 2</option>
      <option value="Primary-3">Primary 3</option>
      <option value="Primary-4">Primary 4</option>
      <option value="Primary-5">Primary 5</option>
      <!-- Add more class options as needed -->
      </select>
      <br>
      
      <select id="typeFilter" class="form-control">
      <option value="">All Types</option>
      <option value="Full">Full Payment</option>
      <option value="Partial">Not Full Payment</option>
      </select>
      <br>
      <input type="date" class="form-control" id="dateFilter">
      <br>
    </div>     

        <section class="actions">
        <button id="addPaymentBtn" class="btn btn-primary btn-xl col-xl-push-4">Add Student Payment</button>
        <button id="addTeacher" class="btn btn-primary btn-xl col-xl-push-4">Add new teacher</button>
        <button id="addAssist" class="btn btn-primary btn-xl col-xl-push-4">Add new assist</button>
        <button id="addLibrarian" class="btn btn-primary btn-xl col-xl-push-4">Add librarian</button>
        </section>
        <br>
        <div class="table-responsive">
            <table class="table table-striped table-hover table-info">
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Payment ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="studentsTableBody">
                    <!-- Dynamic Content here -->
                </tbody>
            </table>
        </div>
    </div>

    
    <!-- Payment Dialog -->
    <div class="modal" id="paymentModal">
        <div class="container"><div class="row"><div class="col-xs col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <div class="modal-content">
            <h2>Add Payment</h2>
            <form id="paymentForm">
                <label for="admno">Admission number:</label>
                <input type="text" class="form-control" id="admno" required>
                <br>
                <label for="studentName">Student Name:</label>
                <input type="text" class="form-control" id="studentName" required>
                <br>
                <label for="studentClass">Class:</label>
                <select id="studentClass" class="form-control" required>
                    <option value="Primary-1">Primary 1</option>
                    <option value="Primary-2">Primary 2</option>
                    <option value="Primary-3">Primary 3</option>
                    <option value="Primary-4">Primary 4</option>
                    <option value="Primary-5">Primary 5</option>
                </select>
                <br>
                <label for="paymentType">Payment Type:</label>
                <select class="form-control" class="form-control" id="paymentType" required>
                    <option value="Full">Full Payment</option>
                    <option value="Partial">Not Full Payment</option>
                </select>
                <br>
                <label for="paymentAmount">Amount:</label>
                <input class="form-control" type="number" id="paymentAmount" disabled>
                <br>
                <label for="paymentDate">Date:</label>
                <input class="form-control" type="date" id="paymentDate" required>
                <br>
                <center><button type="submit" class="btn btn-success form-control">Save</button></center>
            </form>
        </div>
    </div></div></div>
    </div>
    <div class="modal" id="AddModal">
       <!-- Content added here for the adding functionality -->
    </div>



<div id="report-section" class="report-section col-xl-8">
        <h2>Generate Reports</h2>
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-11">
        <select id="reportClassFilter" class="form-control">
            <option value="">All Classes</option>
            <option value="Primary-1">Primary 1</option>
            <option value="Primary-2">Primary 2</option>
            <option value="Primary-3">Primary 3</option>
            <option value="Primary-4">Primary 4</option>
            <option value="Primary-5">Primary 5</option>
        </select>
        <br>
        <select id="reportTypeFilter" class="form-control">
            <option value="">All Payment Types</option>
            <option value="Full">Full Payment</option>
            <option value="Partial">Not Full Payment</option>
        </select>
        <br>
        <input type="date" id="reportDateFilter" class="form-control">
        <br>
    </div>
        <button id="generateReportBtn" class="btn btn-success">Generate Report</button>
        <br>
  <br>
    <div class="table-responsive">
        <table id="reportTable" class="table table-striped table-light table-hover">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Payment ID</th>
                </tr>
            </thead>
            <tbody id="reportTableBody">
                <!-- Generated Report Content Here -->
            </tbody>
        </table>
    </div>
        <div id="reportTotals">
            <p class="text-primary">Total Students: <span id="totalReportStudents" class="tex-muted">0</span></p>
            <p class="text-success">Grand Total Amount: Ksh<span id="grandTotalReport">0</span></p>
        </div>

    <section class="report-actions">
        <button onclick="generatePDF()" id="printReportBtn" class="btn btn-secondary">Print Report</button>
    </section>
    <button id="printReportBt" style="display:none;" type="submit"></button>
</div>



</body>
<script src="./assets/js/general.js"></script>
<script src="./assets/js/chart.js"></script>
<script src="./assets/js/jspdf.js"></script>
<script src="./assets/js/jalikoafigurestowords.min.js"></script>
<script src="./assets/js/autotable.js"></script>
<script src="./assets/js/main.js"></script>
<script src="./assets/js/pdfgen.js"></script>
<script src="./assets/js/app.js"></script>
<script src="./assets/js/adminactivitycontroller.js"></script>
</html>