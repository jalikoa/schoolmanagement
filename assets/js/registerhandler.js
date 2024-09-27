const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userContact = document.getElementById('contact');
const userAdmNo = document.getElementById('admNo');
const userGender = document.getElementById('gender');
const userPassword = document.getElementById('setPassword');
const confrimedPassword = document.getElementById('confirmPassword');
const registerForm = document.getElementById('form');
registerForm.addEventListener('submit',()=>{
    const xhr = checkXML();
    const data = `username=${encodeURIComponent(userName.value)}&useremail=${encodeURIComponent(userEmail.value)}&usercontact=${userContact.value}&useradmno=${encodeURIComponent(userAdmNo.value)}&usergender=${encodeURIComponent(userGender.value)}&userpassword=${encodeURIComponent(userPassword.value)}`;
    xhr.open('POST','http://localhost/feeforum/backend/registeruser.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success){
                window.location.href = './chart.html';
            }
        } else {
            console.log('There was a problem with the registration.');
        }       
    }
        xhr.send(data);
})