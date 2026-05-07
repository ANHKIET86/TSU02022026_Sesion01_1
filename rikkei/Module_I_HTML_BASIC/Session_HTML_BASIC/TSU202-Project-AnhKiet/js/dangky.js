let users = JSON.parse(localStorage.getItem("users"))||[];
console.log(users);

let formRegister = document.getElementById("form-register");
let email = document.getElementById("email");
let password = document.getElementById("password");

formRegister.addEventListener("submit", function(event){
  event.preventDefault();
  let emailInput = email.value.trim();
  let password = password.value.trim();

  let users = {
    email : emailInput,
    password : passwordInput
  }

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  alert("DAngb ky thanh cong!");
  window.location.href ="./";
})
