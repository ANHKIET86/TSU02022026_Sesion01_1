let a = [];
let b = [];

console.log("Nhập mảng a");
for (let i = 0; i < 10; i++) {
    a[i] = parseInt(prompt("a[" + i + "]"));
}

console.log("Nhập mảng b");
for (let i = 0; i < 10; i++) {
    b[i] = parseInt(prompt("b[" + i + "]"));
}

let c = b.concat(a);

console.log("Mảng c:", c);