let a = Number(prompt("Nhập số thứ nhất"));
let b = Number(prompt("Nhập số thứ hai"));
let c = Number(prompt("Nhập số thứ ba"));

let max = a;

if (b > max){   
    max = b
}

if (c > max){   
    max = c
}

console.log("Số lớn nhất là: " + max);