function preventDefaultSubmissions(){
const form = document.querySelectorAll('#form');
for (i = 0;i < form.length;i++){
    form[i].addEventListener('submit',(e)=>{
        e.preventDefault();
    })
}}
preventDefaultSubmissions();
function checkXML(){
    if (window.XMLHttpRequest){
         const request = new XMLHttpRequest();
         return request;
    } else {
         if (window.ActiveXObject){
              const request = new ActiveXObject('Microsoft.XMLHTTP');
              return request;
         }
    }
}
const confirmationPopup = document.getElementById('confirmation-popup');
const teacherhandler = 'http://localhost/feeforum/backend/teachersdashboardhandler.php';
function del(){
    if (confirmationPopup.classList.contains('none')){
    confirmationPopup.classList.remove('none');
    }
    if (confirmationPopup.classList.contains('fade')){
    confirmationPopup.classList.remove('fade');
    }
    confirmationPopup.classList.add('visible');
    hidePopup();
}
function dele(studentid){
    if (confirmationPopup.classList.contains('none')){
    confirmationPopup.classList.remove('none');
    }
    if (confirmationPopup.classList.contains('fade')){
    confirmationPopup.classList.remove('fade');
    }
    const content = `<h5 class="text-danger">Are you sure you want to delete this entry?</h5>
                <nav id="decisions">
                    <input type="button" class="cancel-btn" onclick="cancelDel()" value="No">
                    <input type="button" class="delete-btn" onclick="permanentlyDeleteStudent(${studentid})" value="Yes">
                </nav>`;
                confirmationPopup.classList.add('alert');
                confirmationPopup.classList.add('alert-light');
                confirmationPopup.innerHTML = content;
    confirmationPopup.classList.add('visible');
}
function hidePopup(){
    setTimeout(()=>{cancelDel()},3000);
}
function cancelDel(){
    if (confirmationPopup.classList.contains('fade')){
        confirmationPopup.classList.remove('fade');
        }
    if (confirmationPopup.classList.contains('alert-success')){
        confirmationPopup.classList.remove('alert-success');
    }
    if (confirmationPopup.classList.contains('alert-warning')){
        confirmationPopup.classList.remove('alert-warning');
    }
    if (confirmationPopup.classList.contains('alert-danger')){
        confirmationPopup.classList.remove('alert-danger');
    }
    if (confirmationPopup.classList.contains('alert-info')){
        confirmationPopup.classList.remove('alert-info');
    }
    if (confirmationPopup.classList.contains('alert-primary')){
         confirmationPopup.classList.remove('alert-primary');
    }
    confirmationPopup.classList.remove('visible');
    confirmationPopup.classList.add('fade');
    confirmationPopup.classList.add('none');
}
function delComplete(){
    confirmationPopup.classList.remove('visible');
    confirmationPopup.classList.add('fade');
    confirmationPopup.classList.add('none');
}