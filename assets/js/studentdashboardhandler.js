const userId = document.getElementById('userId').value;
const studentName = document.getElementById('username');
const studentAdmNo = document.getElementById('useradmno');
const studentGrade = document.getElementById('usergrade');
const studentEmail = document.getElementById('useremail');
const studentPhone = document.getElementById('userphone');
const totalFees = document.getElementById('totalfees');
const amountPaid = document.getElementById('amountpaid');
const feeBalance = document.getElementById('balance');

async function fetchCredentials(){
    const data = `userid=${encodeURIComponent(userId)}&loadcredetials=${encodeURIComponent('true')}`;
   xhr = checkXML();
   xhr.open('POST','http://localhost/feeforum/backend/studentdashboardhandler.php',true);
   xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
   xhr.onload = function(){
     if(xhr.status === 200){
         const response = JSON.parse(xhr.responseText);
         if (response.success){
          studentName.innerText = response.userName;
          studentAdmNo.innerText = response.userRegNo;
          studentGrade.innerText = response.userGrade;
          studentEmail.innerText = response.userEmail;
          studentPhone.innerText = response.userContact;
          totalFees.innerText = getFullPayment(response.userGrade);
         } 
     } else {
          alert('There was an error while parsing the request that you requested for please ensure that your internet handset is configured and try again please');
     }
   }
   xhr.send(data);
}
async function fetchFeeInformation(){
     const data = `userid=${encodeURIComponent(userId)}&fetchfeeinformation=${encodeURIComponent('true')}`;
     feeXhr = checkXML();
   feeXhr.open('POST','http://localhost/feeforum/backend/studentdashboardhandler.php',true);
   feeXhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
   feeXhr.onload = function(){
     if(feeXhr.status === 200){
         const response = JSON.parse(feeXhr.responseText);
         if (response.success){
          amountPaid.innerText = response.amountPaid;
          feeBalance.innerText = getFullPayment(response.userGrade) - response.amountPaid;
         } 
     } else {
          alert('There was an error while parsing the request that you requested for please ensure that your internet handset is configured and try again please');
     }
   }
   feeXhr.send(data);
}

function getFullPayment(studentClass) {
     switch (studentClass) {
         case 'Primary-1':
             return 20000;
         case 'Primary-2':
             return 23000;
         case 'Primary-3':
             return 25000;
         case 'Primary-4':
             return 27000;
         case 'Primary-5':
             return 30000;
         default:
             return 0;
     }
 }
fetchCredentials();
fetchFeeInformation();