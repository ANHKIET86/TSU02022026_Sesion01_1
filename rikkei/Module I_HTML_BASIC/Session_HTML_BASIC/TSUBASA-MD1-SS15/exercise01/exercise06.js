let arr6 = [];

for (let i = 0; i < 10; i++) {
    arr6[i] = parseInt(prompt("Nhập phần tử " + i));
}

let x = parseInt(prompt("Nhập số cần tìm"));

if (arr6.includes(x)) {
    console.log(`Number ${x} is in the array`);
} else {
    console.log(`Number ${x} is not in the array`);
}