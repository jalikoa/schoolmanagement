const students = [];

document.getElementById('addPaymentBtn').addEventListener('click', () => {
    // Open the modal and reset form for new entry
    document.getElementById('paymentModal').style.display = 'flex';
    resetForm();
    document.getElementById('paymentForm').onsubmit = addNewStudent;  // Ensure adding new student
});

function addNewStudent(event) {
    event.preventDefault();
    const amount = document.getElementById('paymentType').value === 'Full' ? getFullPayment(document.getElementById('studentClass').value) : document.getElementById('paymentAmount').value;
    const uid = generatePaymentID();
    pushToDatabase(document.getElementById('admno').value,amount,document.getElementById('studentClass').value,document.getElementById('paymentDate').value,uid);

    updateStudentList();
    document.getElementById('paymentModal').style.display = 'none';
    resetForm();
}

function getFullPayment(studentClass) {
    switch (studentClass) {
        case 'Primary 1':
            return 20000;
        case 'Primary 2':
            return 23000;
        case 'Primary 3':
            return 25000;
        case 'Primary 4':
            return 27000;
        case 'Primary 5':
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
    calculateStats();
}



function calculateStats() {
    const totalFees = students.reduce((acc, student) => acc + parseInt(student.paymentAmount), 0);
    const studentsPaid = students.length;
    const totalPending = students.filter(student => student.paymentType !== 'Full').length;

    document.getElementById('totalFees').textContent = `${totalFees.toLocaleString()}`;
    document.getElementById('studentsPaid').textContent = studentsPaid;
    document.getElementById('totalPending').textContent = totalPending;
}
//To handle delete confirmation popup

//delete functionality 
function deleteStudent(paymentId){
    console.log(paymentId);
    updateStudentList();
}

// Edit Functionality
function editStudent(paymentId) {
    const student = students.find(student => student.paymentId === paymentId);
    if (student) {
        // Populate modal with existing student details
        document.getElementById('studentName').value = student.studentName;
        document.getElementById('studentClass').value = student.studentClass;
        document.getElementById('paymentType').value = student.paymentType;
        document.getElementById('paymentAmount').value = student.paymentAmount;
        document.getElementById('paymentDate').value = student.paymentDate;

        // Handle payment amount disabling
        if (student.paymentType === 'Full') {
            document.getElementById('paymentAmount').disabled = true;
        } else {
            document.getElementById('paymentAmount').disabled = false;
        }

        // Open modal
        document.getElementById('paymentModal').style.display = 'flex';

        // Modify form submission to update the existing student
        document.getElementById('paymentForm').onsubmit = function(event) {
            event.preventDefault();
            updateStudent(student);
        };
    }
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