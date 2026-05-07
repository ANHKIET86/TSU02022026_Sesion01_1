let arr2 = [];
for (let i = 0; i < 10; i++) {
    arr2[i] = parseInt(prompt("Nhập phần tử khác nhau " + i));
}

let max = arr2[0];
let index = 0;

for (let i = 1; i < arr2.length; i++) {
    if (arr2[i] > max) {
        max = arr2[i];
        index = i;
    }
}

console.log("Max:", max);
console.log("Vị trí:", index);