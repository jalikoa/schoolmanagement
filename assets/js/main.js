document.getElementById('addPaymentBtn').addEventListener('click', () => {
    // Open the modal and reset form for new entry
    document.getElementById('paymentModal').style.display = 'flex';
    resetForm();
    document.getElementById('paymentForm').onsubmit = addNewStudent;  // Ensure adding new student
});
document.getElementById('addTeacher').addEventListener('click',()=>{
    const content = ` <div class="container"><div class="row"><div class="col-xs col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <div class="modal-content">
            <h2>Add Teacher</h2>
            <form id="addTeacherForm">
                <label for="teacherName">Name:</label>
                <input type="text" class="form-control" id="teacherName" placeholder="Name" required>
                <br>
                <label for="teacherEmail">Email:</label>
                <input type="email" class="form-control" id="teacherEmail" placeholder="Email" required>
                <br>
                <label for="teacherClass">Class:</label>
                <select id="teacherClass" class="form-control" required>
                    <option value="Primary-1">Primary 1</option>
                    <option value="Primary-2">Primary 2</option>
                    <option value="Primary-3">Primary 3</option>
                    <option value="Primary-4">Primary 4</option>
                    <option value="Primary-5">Primary 5</option>
                </select>
                <br>
                <br>
                <label for="teacherPhone">Contact:</label>
                <input class="form-control" type="tel" id="teacherPhone" placeholder="Phone" required>
                <br>
                <label for="teacherPassword">Password:</label>
                <input class="form-control" type="password" id="teacherPassword" placeholder="Password" required>
                <br>
                <center><button type="button" onclick="addNewTeacher()" class="btn btn-success form-control">Add</button></center>
            </form>
        </div>
    </div></div></div>`
    document.getElementById('AddModal').innerHTML = content;
    document.getElementById('AddModal').style.display = 'flex';

});

function addNewStudent(event) {
    event.preventDefault();
    const amount = document.getElementById('paymentType').value === 'Full' ? getFullPayment(document.getElementById('studentClass').value) : document.getElementById('paymentAmount').value;
    console.log(document.getElementById('studentClass').value);
    const uid = generatePaymentID();
    pushToDatabase(document.getElementById('admno').value,document.getElementById('studentName').value,amount,document.getElementById('studentClass').value,document.getElementById('paymentDate').value,uid);

    updateStudentList();
    document.getElementById('paymentModal').style.display = 'none';
    resetForm();
}

function getFullPayment(studentClass) {
    switch (studentClass) {
        case 'Primary-1':
            return 20000;
        case 'Primary-2':
            return 23000;
        case 'Primary-3':
            return 25000;
        case 'Primary-4':
            return 27000;
        case 'Primary-5':
            return 30000;
        default:
            return 0;
    }
}

function generatePaymentID() {
    return Math.random().toString(10).substr(2, 9);
}

function resetForm() {
    document.getElementById('paymentForm').reset();
    document.getElementById('paymentAmount').disabled = true;
}

function updateStudentList() {
    fetchAllStudentsFromDataBase();
}

function getPosition(id){
    for(i = 0;i < students.length;i++){
        if(students[i].id == id){
            return i;
            break;
        }
    }
}
function getPaymentType (id){
    const i = getPosition(id);
    const studentClass = students[i].grade;
    console.log(studentClass);
    const FullPayment = getFullPayment(studentClass);

    console.log(FullPayment);
    if(students[i].amountpaid === FullPayment || students[i].amountpaid > FullPayment ){
        return 'Full';
    } 
    if (students[i].amountpaid < FullPayment){
        return 'Partial';
    }
}
// Edit Functionality
function editStudent(studentId) {
        const i = getPosition(studentId);
        console.log(students[i]);
        document.getElementById('admno').value = students[i].payerregno;
        document.getElementById('studentName').value = students[i].name;
        document.getElementById('studentClass').value = students[i].grade;
        document.getElementById('paymentType').value = getPaymentType(studentId);
        document.getElementById('paymentAmount').value = students[i].amountpaid;
        document.getElementById('paymentDate').value = students[i].datepaid;

        // Handle payment amount disabling
        console.log(getPaymentType(studentId));
        if (getPaymentType(studentId) === 'Full') {
            document.getElementById('paymentAmount').disabled = true;
        } else {
            document.getElementById('paymentAmount').disabled = false;
        }

        // Open modal
        document.getElementById('paymentModal').style.display = 'flex';

        // Modify form submission to update the existing student
        document.getElementById('paymentForm').onsubmit = function(event) {
            event.preventDefault();
            updateStudent(students);
        };
    }

function updateStudent(student) {
    student.studentName = document.getElementById('studentName').value;
    student.studentClass = document.getElementById('studentClass').value;
    student.paymentType = document.getElementById('paymentType').value;
    student.paymentAmount = student.paymentType === 'Full' 
        ? getFullPayment(student.studentClass) 
        : document.getElementById('paymentAmount').value;
    student.paymentDate = document.getElementById('paymentDate').value;
    updateStudentList();
    document.getElementById('paymentModal').style.display = 'none';
    //Include a function to update the students payment as well in the database 
    resetForm();
}

// Close Modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target === document.getElementById('paymentModal')) {
        document.getElementById('paymentModal').style.display = 'none';
        resetForm();
    }
});

// Handle Full/Partial Payment Selection
document.getElementById('paymentType').addEventListener('change', function() {
    if (this.value === 'Full') {
        document.getElementById('paymentAmount').disabled = true;
    } else {
        document.getElementById('paymentAmount').disabled = false;
    }
});


// To draw payment curve over the periods  


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Fee payment graph analysis',
            data: [60, 19, 9, 65, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Fee payment graph analysis',
                font: {
                    size: 18
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});