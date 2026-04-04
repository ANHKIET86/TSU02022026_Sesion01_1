let text = document.querySelector('.text');
let btnHide = document.querySelector('.hide');
let btnShow = document.querySelector('.show');
btnHide.onclick = function () {
  text.style.display = 'none';
};
btnShow.onclick = function () {
  text.style.display = 'block';
};