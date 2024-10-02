const admNo = document.getElementById('admNo');
const password = document.getElementById('password');
const userRole = document.getElementById('userRole');

const loginForm = document.getElementById('form');
loginForm.addEventListener('submit',()=>{
    const xhr = checkXML();
    const data = `useradmno=${encodeURIComponent(admNo.value)}&userpassword=${encodeURIComponent(password.value)}&userrole=${encodeURIComponent(userRole.value)}`;
    xhr.open('POST','http://localhost/feeforum/backend/loginuser.php',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.onload = function (){
        console.log(xhr.responseText);
        if (xhr.status === 200){
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
                setTimeout(()=>{
                    if (response.rd == 1){
                        window.location.href= `dashboard.php?user_id=${response.userid}`
                    }
                    if (response.rd == 2){
                        window.location.href= `teacherdashboard.php?user_id=${response.userid}`
                    }
                },1500);
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
            console.log('Hey there there was a problem with logging you in please try again later ');
        }
    }
    console.log(data);
    xhr.send(data);
})

