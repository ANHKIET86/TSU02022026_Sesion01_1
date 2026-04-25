let showPassword = document.querySelector('.show-password');
let inputPassword = document.querySelector('#password');
// sự kiện show password và hide password
showPassword.onclick = function () {
  if (inputPassword.getAttribute('type') === 'password') {
    inputPassword.setAttribute('type', 'text');
  } else {
    inputPassword.setAttribute('type', 'password');
  }
};

let users = JSON.parse(localStorage.getItem('users')) || [];

let form = document.getElementById('form');

let errorEmail = document.querySelector('.error-email');
let errorPassword = document.querySelector('.error-password');

form.onsubmit = function (e) {
  e.preventDefault();
  if (validateData(form)) {
    if (checkEmailAndPassword(form.email.value, form.password.value)) {
      alert('Đăng nhập thành công');
    } else {
      alert('Email hoặc mật khẩu sai');
    }
  }
};

function checkEmailAndPassword(email, password) {
  return users.some((el) => el.email === email && el.password === password);
}

function validateData(form) {
  let check = true;
  // validate email
  if (form.email.value === '') {
    // trường hợp email để trống
    errorEmail.innerText = 'Email không được để trống';
    check = false;
  } else if (!validEmail(form.email.value)) {
    // kiểm tra validate email hợp lệ bằng pattern (regex)
    errorEmail.innerText = 'Email không hợp lệ';
    check = false;
  } else {
    errorEmail.innerText = '';
  }
  // validate password
  if (form.password.value === '') {
    // trường hợp password để trống
    errorPassword.innerText = 'Password không được để trống';
    check = false;
  } else if (!validPassword(form.password.value)) {
    // kiểm tra validate password hợp lệ bằng pattern (regex)
    errorPassword.innerText = 'Password không hợp lệ';
    check = false;
  } else {
    errorPassword.innerText = '';
  }
  return check;
}

function validEmail(email) {
  // sử dụng regex -> regular expression
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validPassword(password) {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}