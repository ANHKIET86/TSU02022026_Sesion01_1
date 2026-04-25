const user = document.querySelector(".user");
const userBtn = document.getElementById("userBtn");
const logoutBtn = document.getElementById("logoutBtn");

userBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  user.classList.toggle("is-open");
  userBtn.setAttribute("aria-expanded", user.classList.contains("is-open"));
});

// click ra ngoài thì đóng
document.addEventListener("click", () => {
  user.classList.remove("is-open");
  userBtn.setAttribute("aria-expanded", "false");
});

// logout: xóa token/session rồi về trang login
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear();

  window.location.href = "./login.html";
});