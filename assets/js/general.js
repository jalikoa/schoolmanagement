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
const inputModal = document.getElementById('modal-modal');
const inputModalContainer = document.getElementById('modal-container');
function showInputModal(){
    inputModalContainer.classList.remove('none');
    inputModalContainer.classList.add('input-modal-display');
}
function cancelEdit(){
    preventDefaultSubmissions();
    inputModalContainer.classList.remove('input-modal-display');
    inputModalContainer.classList.add('none');
}
window.addEventListener('click',(e)=>{
    if(e.target == inputModalContainer){
        inputModalContainer.classList.remove('input-modal-display');
        inputModalContainer.classList.add('none');
    }
})