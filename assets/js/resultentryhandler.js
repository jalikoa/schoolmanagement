function editProfile(){
    const username = document.getElementById('teacherpronoun');
    const contact = document.getElementById('teacherphone');
    const email = document.getElementById('teacheremail');
    const content = `<h5 class="text-primary"> Are you sure you want to Ediit your profile?</h5>
    <nav id="decisions">
        <input type="button" class="cancel-btn" onclick="cancelDel()" value="cancel">
        <input type="button" class="delete-btn" onclick="populatemodalAndFill('${username.innerText}','${contact.innerText}','${email.innerText}')" value="Yes">
    </nav>`;
    confirmationPopup.classList.add('alert');
    confirmationPopup.classList.add('alert-info');
    confirmationPopup.innerHTML = content;
    del();
}
function populatemodalAndFill(name,contact,email){
    delComplete();
   const editContent = `<h3 class="text-primary">Edit Profile</h3>
            <br><br>
            <form action="" role="form" id="form">
                <div class="input-grup">
                    <label for="editname">Name:</label><br>
                    <input type="text" id="editname" class="form-control" value='${name}' required>
                    <br>
                </div>
                <div class="input-grup">
                    <label for="editemail">Email:</label><br>
                    <input type="email" id="editemail" class="form-control" value='${email}' required>
                    <br>
                </div>
                <div class="input-grup">
                    <label for="editphone">Phone:</label><br>
                    <input type="tel" id="editphone" class="form-control" value='${contact}' required>
                    <br>
                </div>
                <div class="input-grup">
                    <label for="editpassword">Input password to save changes:</label><br>
                    <input type="password" id="editpassword" class="form-control" required>
                    <br>
                </div>
                <div class="input-group">
                    <button onclick="saveEdits('${email}')" class="btn btn-primary">Save changes</button>&nbsp;
                    <button onclick="cancelEdit()" class="btn btn-info">Cancel changes</button>
                </div>
            </form>`;
            inputModal.innerHTML = editContent;
            inputModalContainer.classList.remove('none');
            inputModalContainer.classList.add('input-modal-display');
}

function saveEdits(email){
    preventDefaultSubmissions();
    const newName = document.getElementById('editname');
    const newEmail = document.getElementById('editemail');
    const newPhone = document.getElementById('editphone');
    const userPassword = document.getElementById('editpassword');
    //This a function that is aimed at implementing a mecxhanism of validating the credentials before they are sent to the database however this is ought to be added later there after now it is just made for the purpose of testing the application that it is not implemented 
    // validate(); 
    const data = `editprofile=${encodeURIComponent('true')}&useremail=${encodeURIComponent(email)}&newname=${encodeURIComponent(newName.value)}&newemail=${encodeURIComponent(newEmail.value)}&newphone=${encodeURIComponent(newPhone.value)}&userpassword=${encodeURIComponent(userPassword.value)}`;
    const teachersXhrOne = checkXML();
    teachersXhrOne.open('POST','http://localhost/feeforum/backend/teachersdashboardhandler.php',true);
    teachersXhrOne.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    teachersXhrOne.onload = ()=>{
        if (teachersXhrOne.status === 200){
                const response = JSON.parse(teachersXhrOne.responseText);
                cancelEdit();
                fetchTeacherInformation();
                if(response.success){
                    const content = `<h5 class="text-suceess">Your profile was succesfully updated</h5>
                    <nav id="decisions">
                        <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                    </nav>`;
                    confirmationPopup.classList.add('alert');
                    confirmationPopup.classList.add('alert-success');
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
            alert('There was a problem parsing your response please try again later');
        }
    }
    teachersXhrOne.send(data);
}



function addNewNotification(){
    inputModal.innerText = '';
    const editContent = `<h3 class="text-primary">Add new Notification</h3>
            <br><br>
            <div class="alert alert-info">The aim of this is to allow you to pass some important notifications to the students via the school system</div>
            <form action="" role="form" id="form">
                <div class="input-grup">
                    <label for="notificationType">Your target :</label><br>
                    <select class="form-control" name="notificationType" id="notificationType" required>
                        <option value="">Select target</option>
                        <option value="All students">All students</option>
                        <option value="Primary-1">Primary-1</option>
                        <option value="Primary-2">Primary-2</option>
                        <option value="Primary-3">Primary-3</option>
                        <option value="Primary-4">Primary-4</option>
                        <option value="Primary-5">Primary-5</option>
                    </select>
                    <br>
                </div>
                <div class="input-grup">
                    <label for="notificationCategory">Notification category:</label><br>
                    <select class="form-control" name="notificationCategory" id="notificationCategory" required>
                        <option value="">Select category</option>
                        <option value="warning">Warning</option>
                        <option value="alert">Alert</option>
                        <option value="info">Information</option>
                        <option value="danger">Danger</option>
                        <option value="congratulations">Congratulations</option>
                        <option value="normal">Normal</option>
                    </select>
                    <br>
                </div>
                <div class="input-grup">
                    <label for="notificationTitle">Title:</label><br>
                    <input type="text" id="notificationTitle" class="form-control" value='' required>
                    <br>
                </div>
                
                <div class="input-grup">
                    <label for="notificationMessage">Notification content:</label><br>
                    <textarea rows="5" type="text" id="notificationMessage" class="form-control text-muted" placeholder="The content of the information you want to pass to students here" required></textarea>
                    <br>
                </div>
                
                <div class="input-group">
                    <button onclick="saveNotifications()" class="btn btn-primary">Save changes</button>&nbsp;
                    <button onclick="cancelEdit()" class="btn btn-info">Cancel</button>
                </div>
            </form>`;
            inputModal.innerHTML = editContent;
    showInputModal();
}
function saveNotifications(){
    preventDefaultSubmissions();
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationType = document.getElementById('notificationType');
    const notificationCategory = document.getElementById('notificationCategory');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationSender =  document.getElementById('teacheremail');
    const data = `createnotification=${encodeURIComponent('true')}&notificationtarget=${encodeURIComponent(notificationTitle.value)}&notificationcategory=${encodeURIComponent(notificationCategory.value)}&notificationmessage=${encodeURIComponent(notificationMessage.value)}&notificationtype=${encodeURIComponent(notificationType.value)}&notificationsender=${notificationSender.innerText}`;
    const teachersXhrTwo = checkXML();
    teachersXhrTwo.open('POST',teacherhandler,true)
    teachersXhrTwo.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    teachersXhrTwo.onload = ()=>{
        if (teachersXhrTwo.status === 200){
            const response = JSON.parse(teachersXhrTwo.responseText);
            if (response.success){
                cancelEdit();
                const content = `<h5 class="text-success">${response.message}</h5>
                    <nav id="decisions">
                        <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                    </nav>`;
                    confirmationPopup.classList.add('alert');
                    confirmationPopup.classList.add('alert-success');
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
            alert("There was an error parsing your request please try again later");
        }
    }
    teachersXhrTwo.send(data);
}
function fetchTeacherInformation(){
    const id = document.getElementById('teachersid');
    const username = document.getElementById('teacherpronoun');
    const contact = document.getElementById('teacherphone');
    const email = document.getElementById('teacheremail');
    const myClass = document.getElementById('teacherclass');
    const data = `fetchTeachersInfo=${encodeURIComponent('true')}&teacherid=${encodeURIComponent(id.value)}`;
    const teachersXhrFive = checkXML();
    teachersXhrFive.open('POST',teacherhandler,true);
    teachersXhrFive.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    teachersXhrFive.onload = ()=>{
        console.log(teachersXhrFive.responseText);
        const response = JSON.parse(teachersXhrFive.responseText);
        if (response.success){
            username.innerText = response.credentials[0].username;
            contact.innerText = response.credentials[0].usercontact;
            email.innerText = response.credentials[0].useremail;
            myClass.innerText = response.credentials[0].class;
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
    }
    teachersXhrFive.send(data);
}
fetchTeacherInformation();
function saveResults(){
    //get headings
    //get rows
    //create table
    //save to database
    const tableHeading = document.getElementById('tableHeading');
    
}