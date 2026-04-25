function isEven(number) {
  return number % 2 === 0;
}

let number = Number(prompt('Nhập vào số cần kiểm tra: ')); // prompt nhập vào là chuỗi
let result = isEven(number);
console.log(`Kêt quả là ${result}`);