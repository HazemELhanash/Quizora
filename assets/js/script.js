var signUpFname = document.getElementById('fname');
var signUpLname = document.getElementById('lname');
var signUpEmail = document.getElementById('email');
var signUpPassword = document.getElementById('password');
var signUpRePassword = document.getElementById('repassword');
var alertFname = document.getElementById('alertFname');
var alertLname = document.getElementById('alertLname');
var alertEmail = document.getElementById('alertEmail');
var alertPassword = document.getElementById('alertPassword');
var message =  document.getElementById('message');
var user = [];
// Check if users exist in localStorage and parse them
if (localStorage.getItem('user') != null) {
    user = JSON.parse(localStorage.getItem('user'))
} else {
    user = [];
}
// Check Password 
signUpRePassword.addEventListener('input', function() {
    if (signUpRePassword.value === signUpPassword.value) {
        signUpRePassword.style.borderColor = 'green'; 
    } else {
        signUpRePassword.style.borderColor = 'red';
    }
}); 

// Regix 
signUpFname.addEventListener('input', function() {
    validationInput(/^[a-zA-Z0-9._]{3,}$/, signUpFname, alertFname);
});
signUpLname.addEventListener('input', function() {
    validationInput(/^[a-zA-Z0-9._]{3,}$/, signUpLname, alertLname);
});

email.addEventListener('input', function() {
    validationInput(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, email, alertEmail);
});
password.addEventListener('input', function(){
    validationInput(/^(?=.*\d).{8,}$/, password, alertPassword); 
});

function validationInput(Regx, element, alert) {
    var pattern = Regx;
    if (pattern.test(element.value)) {
        alert.style.display = "none";
    } else {
        alert.style.display = "block";
    }
}
var isvalid = true;
function SignUp(e) {
    e.preventDefault();  
    if (signUpEmail.value === '' || signUpFname.value === '' || signUpLname.value === '' ||signUpPassword.value === '' || signUpRePassword.value === '') {
        message.innerHTML = `<p style="color:red; padding: 10px 0 0 10px;">All inputs is required</p>`;
         isvalid = false;
;
    } 
    if (signUpPassword.value !== signUpRePassword.value) {
        message.innerHTML = `<p style="color:red; padding: 10px 0 0 10px;">Passwords do not match</p>`;
        isvalid = false;
    }
    // some(); => return True or false;
    let isEmailExists = user.some(user => user.email === signUpEmail.value);
    if(isvalid){
        if(isEmailExists){
            message.innerHTML = `<p style="color:red; padding: 10px 0 0 10px;">User is Already exist</p>`;
        }
         
    else {
        var obj = {
            name: signUpFname.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        }
        user.push(obj);
        location.href = 'login.html';
        localStorage.setItem('user', JSON.stringify(user));
    }
    }

}