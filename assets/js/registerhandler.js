const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userContact = document.getElementById('contact');
const userClass = document.getElementById('class');
const userAdmNo = document.getElementById('admNo');
const userGender = document.getElementById('gender');
const userPassword = document.getElementById('setPassword');
const confrimedPassword = document.getElementById('confirmPassword');
const registerForm = document.getElementById('form');
registerForm.addEventListener('submit',()=>{
    const xhr = checkXML();
    const data = `username=${encodeURIComponent(userName.value)}&userclass=${encodeURIComponent(userClass.value)}&useremail=${encodeURIComponent(userEmail.value)}&usercontact=${userContact.value}&useradmno=${encodeURIComponent(userAdmNo.value)}&usergender=${encodeURIComponent(userGender.value)}&userpassword=${encodeURIComponent(userPassword.value)}`;
    xhr.open('POST','http://localhost/feeforum/backend/registeruser.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
            const response = JSON.parse(xhr.responseText);
            if (response.success){
                const content = `<h5 class="text-success">${response.message}</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="Ok">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
                del();
                setTimeout(()=>{cancelDel()},800);
                const id = '9';
                setTimeout(()=>{window.location.href= './login.html';},1500);
            }
        } else {
            console.log('There was a problem with the registration.');
        }       
    }
        console.log(data);
        xhr.send(data);
})