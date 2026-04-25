let n = parseInt(prompt("Nhập số phần tử"));
let arr3 = [];

for (let i = 0; i < n; i++) {
    arr3[i] = parseInt(prompt("Nhập phần tử"));
}

let sum = 0;
let max3 = arr3[0];

for (let num of arr3) {
    sum += num;
    if (num > max3) max3 = num;
}

console.log("Max:", max3);
console.log("Trung bình:", sum / n);