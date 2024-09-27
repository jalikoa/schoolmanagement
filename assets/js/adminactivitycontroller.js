function pushToDatabase(admNo,amountpaid,grade,datepaid,uid){
    const xhr = checkXML();
    xhr.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    const data = `addnewpayment=${encodeURIComponent('true')}&admno=${encodeURIComponent(admNo)}&amountpaid=${encodeURIComponent(amountpaid)}&grade=${encodeURIComponent(grade)}&datepaid=${encodeURIComponent(datepaid)}&uid=${encodeURIComponent(uid)}`;
    xhr.onload = function(){
        if(xhr.status === 200){
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
        } else {
            alert('There was an error parsing your response try again later')
        }
    }
    xhr.send(data);

}


function fetchAllStudentsFromDataBase(){
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';

    const xhr = checkXML();
    xhr.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    const data = `fetchpaymentrecords=${encodeURIComponent('true')}`;
    xhr.onload = function(){
        if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            console.log(response.message);
            if (!response.success){
                 alert(response.message);
                 const row = document.createElement('tr');
                 row.style.color = 'red';
                 row.innerHTML = response.message;
        } else {
            students.forEach(student => {
                const row = document.createElement('tr');
        
                row.innerHTML = `
                    <td>${student.studentName}</td>
                    <td>${student.studentClass}</td>
                    <td class="${student.paymentType === 'Full' ? 'paid' : 'not-paid'}">${student.paymentType}</td>
                    <td>${student.paymentAmount}</td>
                    <td>${student.paymentDate}</td>
                    <td>${student.paymentId}</td>
                    <td class="flexs">
                        <button class="btn btn-primary" onclick="editStudent('${student.paymentId}')">Edit</button>
                        <button class="btn btn-danger" onclick="del('${student.paymentId}')">Delete</button>
                        <button class="btn btn-secondary" onclick="printPersonalStudentReceipt('${student.paymentId}')">Receipt</button>
                    </td>
                `
        }); }
        tableBody.appendChild(row);
    } else {
        alert('There was an error parsing your response try again later');
    }
    xhr.send(data);
    
}}
fetchAllStudentsFromDataBase();