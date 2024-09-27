const admNo = document.getElementById('admNo');
const password = document.getElementById('password');

const loginForm = document.getElementById('form');
loginForm.addEventListener('submit',()=>{
    const xhr = checkXML();
    const data = `useradmno=${encodeURIComponent(admNo.value)}&userpassword=${encodeURIComponent(password.value)}`;
    xhr.open('POST','http://localhost/feeforum/backend/loginuser.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.onload = function (){
        if (xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            if (response.success){
                window.location.href = './dashboard.php';
            }
        } else {
            console.log('Hey there there was a problem with logging you in please try again later ');
        }
    }
    xhr.send(data);
})

