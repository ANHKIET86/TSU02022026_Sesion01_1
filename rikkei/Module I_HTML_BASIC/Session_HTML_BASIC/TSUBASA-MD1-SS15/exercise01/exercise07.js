let arr7 = [];

for (let i = 0; i < 10; i++) {
    arr7[i] = parseInt(prompt("Nhập phần tử " + i));
}

arr7.sort((a, b) => b - a);

console.log("Mảng giảm dần:", arr7);