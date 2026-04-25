let str = prompt("Nhập chuỗi số (cách nhau bằng dấu cách)");
let arr5 = str.split(" ").map(Number);

let countNeg = 0;
for (let num of arr5) {
    if (num < 0) countNeg++;
}

console.log("Số nguyên âm:", countNeg);