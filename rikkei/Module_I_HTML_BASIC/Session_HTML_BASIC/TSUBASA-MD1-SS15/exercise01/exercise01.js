let arr1 = [];
for (let i = 0; i < 10; i++) {
    arr1[i] = parseInt(prompt("Nhập phần tử " + i));
}

let count = 0;
for (let num of arr1) {
    if (num >= 10) count++;
}

console.log("Số phần tử >= 10 là:", count);