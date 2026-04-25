let arr4 = [];
let n4 = parseInt(prompt("Nhập số phần tử"));

for (let i = 0; i < n4; i++) {
    arr4[i] = parseInt(prompt("Nhập phần tử"));
}

arr4.reverse();

console.log("Mảng sau khi đảo:", arr4);