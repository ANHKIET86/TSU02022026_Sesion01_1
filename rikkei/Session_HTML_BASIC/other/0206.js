let email = document.getElementById ("email");

let pass = document.getElementById("pass");

let btn = document.getElementById ("btn");

btn.addEventListener('click',function(){
    const user= {
    email: email,
    password: password
};
    console.log(user);
});