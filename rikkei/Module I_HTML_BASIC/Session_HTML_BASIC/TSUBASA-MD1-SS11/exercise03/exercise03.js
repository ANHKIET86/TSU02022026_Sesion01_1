let number = Number(prompt('Nhập vào một số từ 0 đến 9'));
switch (number) {
  case 0:
    alert('Sô Không');
    break;
  case 1:
    alert('Sô Một');
    break;
  case 2:
    alert('Sô Hai');
    break;
  case 3:
    alert('Sô Ba');
    break;
  case 4:
    alert('Sô Bốn');
    break;
  case 5:
    alert('Sô Năm');
    break;
  case 6:
    alert('Sô Sáu');
    break;
  case 7:
    alert('Sô Bảy');
    break;
  case 8:
    alert('Sô Tám');
    break;
  case 9:
    alert('Sô Chín');
    break;
  default:
    alert('Chưa xử lý số lớn hơn 10');
    break;
}