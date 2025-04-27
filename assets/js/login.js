var user = JSON.parse(localStorage.getItem('user')) || [];
var signInEmail = document.getElementById('email');
var signInPassword = document.getElementById('password');

// if user is already in
document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    if (signInEmail.value === '' || signInPassword.value === '') {
        document.getElementById('message').innerHTML = `<p class='text-center' style="color:red;">Please enter both email and password</p>`;
    } else {
        checkUser();
    }
});

function checkUser() {
    var found = false;
    for (var i = 0; i < user.length; i++) {
        if (signInEmail.value === user[i].email && signInPassword.value === user[i].password) {
            found = true;
            localStorage.setItem('userName', user[i].name);
            sessionStorage.setItem("isLoggedIn", "true");
            location.replace("exam.html");
            break;
        }
    }
    if (!found) {
        document.getElementById('message').innerHTML = `<p class='text-center' style="color:red;">Invalid email or password</p>`;
    }
}
