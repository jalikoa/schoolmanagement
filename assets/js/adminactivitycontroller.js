let students = [];
function pushToDatabase(admNo,name,amountpaid,grade,datepaid,uid){
    const xhr = checkXML();
    xhr.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    const data = `addnewpayment=${encodeURIComponent('true')}&admno=${encodeURIComponent(admNo)}&name=${encodeURIComponent(name)}&amountpaid=${encodeURIComponent(amountpaid)}&grade=${encodeURIComponent(grade)}&datepaid=${encodeURIComponent(datepaid)}&uid=${encodeURIComponent(uid)}`;
    console.log(data);
    xhr.onload = function(){
        if(xhr.status === 200){
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            if (response.success){
                fetchAllStudentsFromDataBase();
                const content = `<h5 class="text-success">${response.message}</h5>
            <nav id="decisions">
                <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
            </nav>`;
            confirmationPopup.classList.add('alert');
            confirmationPopup.classList.add('alert-light');
            confirmationPopup.innerHTML = content;
            del();
            } else {
                const content = `<h5 class="text-danger">${response.message}</h5>
            <nav id="decisions">
                <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
            </nav>`;
            confirmationPopup.classList.add('alert');
            confirmationPopup.classList.add('alert-danger');
            confirmationPopup.innerHTML = content;
            del();
            }
        } else {
            alert('There was an error parsing your response try again later')
        }
    }
    xhr.send(data);
}
function addNewTeacher(){
    const teacherName = document.getElementById('teacherName');
    const teacherEmail = document.getElementById('teacherEmail');
    const teacherClass = document.getElementById('teacherClass');
    const teacherPhone = document.getElementById('teacherPhone');
    const teacherPassword = document.getElementById('teacherPassword');
    preventDefaultSubmissions();
    const addTeacher = checkXML();
    addTeacher.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    addTeacher.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    const data = `addteacher=${encodeURIComponent('true')}&teachername=${encodeURIComponent(teacherName.value)}&teacheremail=${encodeURIComponent(teacherEmail.value)}&teacherclass=${encodeURIComponent(teacherClass.value)}&teacherphone=${encodeURIComponent(teacherPhone.value)}&teacherpassword=${encodeURIComponent(teacherPassword.value)}`;
    document.getElementById('AddModal').style.display = 'none';
    document.getElementById('AddModal').innerHTML = '';
    addTeacher.onload = ()=>{
        console.log(addTeacher.responseText);
        if(addTeacher.status === 200){
            const response = JSON.parse(addTeacher.responseText);
            if (response.success){
                const content = `<h5 class="text-success">${response.message}</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
                del();
            } else {
                const content = `<h5 class="text-danger">${response.message}</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
                del();
            }
        } else {
            alert('There was an error parsing your response please try again later');
        }
    }
    console.log(data);
    addTeacher.send(data);
}


function fetchAllStudentsFromDataBase(){
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    const xhrr = checkXML();
    xhrr.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    xhrr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    const data = `fetchpay=${encodeURIComponent('true')}`;
    xhrr.onload = ()=>{
        console.log(xhrr.responseText);
        if(xhrr.status === 200){
            const response = JSON.parse(xhrr.responseText);
            console.log(response.list);
            if (response.success){
                
                students = response.list;
                students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.payerregno}</td>
                    <td>${student.name}</td>
                    <td>${student.grade}</td>
                    <td>${student.amountpaid}</td>
                    <td>${student.datepaid}</td>
                    <td>${student.uid}</td>
                    <td>
                      <div class="flexs">
                        <button class="btn btn-primary" onclick="editStudent('${student.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="dele('${student.id}')">Delete</button>
                        <button class="btn btn-secondary" onclick="printPersonalStudentReceipt('${student.id}')">Receipt</button>
                      </div>
                    </td>
                `
                tableBody.appendChild(row);
        }); 
    }
    } else {
        alert('There was an error parsing your response try again later');
    }
        }
        xhrr.send(data);
    }
function getStat(){
    const stat = checkXML();
    const data = `fetch_stat=${encodeURIComponent('true')}`;
    stat.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    stat.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    stat.onload = ()=>{
        console.log(stat.responseText);
        if (stat.status === 200){
            const response = JSON.parse(stat.responseText);
            let totalFees = 0;
            if (response.success){
                 response.totalpaid.forEach(fee=>{
                    totalFees += parseInt(fee);
                });
            }
            document.getElementById('totalFees').innerText = 'Ksh ' + totalFees;
            document.getElementById('studentsPaid').innerText = response.sumstudent;
        } else {
            console.log(stat.responseText);
        }
    }
    stat.send(data);
}
function permanentlyDeleteStudent(id){
    cancelDel();
    const delXhr = checkXML();
    const data = `deletestudent=${encodeURIComponent('true')}&studentid=${encodeURIComponent(id)}`;
    delXhr.open('POST','http://localhost/feeforum/backend/adminactivitycontroller.php',true);
    delXhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    delXhr.onload = ()=>{
        console.log(delXhr.responseText);
        if (delXhr.status === 200){
            const response = JSON.parse(delXhr.responseText);
            if (response.success){
                fetchAllStudentsFromDataBase();
                    const content = `<h5 class="text-success">${response.message}</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
                del();
            } else {
                    const content = `<h5 class="text-danger">${response.message}</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
                del();
            }
        } else {
            alert('Sorry there was an error while trying to parse your response please try again later');
        }
    }
    delXhr.send(data);
}
getStat();
fetchAllStudentsFromDataBase();