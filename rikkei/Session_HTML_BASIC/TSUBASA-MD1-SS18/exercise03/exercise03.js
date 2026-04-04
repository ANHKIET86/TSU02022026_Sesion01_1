let btnOpen = document.querySelector('.btn-open');
let btnClose = document.querySelector('.btn-close');
let overlay = document.querySelector('.overlay');
btnOpen.onclick = function () {
  overlay.style.display = 'block';
};

btnClose.onclick = function () {
  overlay.style.display = 'none';
};