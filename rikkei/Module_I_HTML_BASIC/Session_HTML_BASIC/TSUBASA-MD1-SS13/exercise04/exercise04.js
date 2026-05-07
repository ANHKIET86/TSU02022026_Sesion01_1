let arr = prompt('Nhập vào chuỗi số: ').split('');
let max = Number(arr[0]);
for (let i = 1; i < arr.length; i++) {
  if (max < Number(arr[i])) {
    max = Number(arr[i]);
  }
}
console.log(`Giá trị lớn nhất = ${max}`);