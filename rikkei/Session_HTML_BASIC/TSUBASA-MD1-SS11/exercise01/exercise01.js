let year = Number(prompt('Nhập vào năm muốn kiểm tra: '));
if (year % 4 === 0 && year % 100 !== 0) {
  alert(`${year} là năm nhuận`);
} else {
  alert(`${year} không phải năm nhuận`);
}