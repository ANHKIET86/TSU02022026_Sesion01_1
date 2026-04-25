// Tạo mảng số nguyên có độ dài ngẫu nhiên từ 10 đến 20
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const length = randomInt(10, 20);

// Bạn có thể đổi khoảng giá trị phần tử nếu muốn (ví dụ -50..50)
const arr = Array.from({ length }, () => randomInt(0, 100));

// Tính tổng lẻ / chẵn
let sumOdd = 0;
let sumEven = 0;

for (const n of arr) {
  if (n % 2 === 0) sumEven += n;
  else sumOdd += n;
}

// Hiển thị bằng alert()
alert("Mảng vừa tạo (" + arr.length + " phần tử):\n[" + arr.join(", ") + "]");

alert("Tổng các số lẻ = " + sumOdd);
alert("Tổng các số chẵn = " + sumEven);