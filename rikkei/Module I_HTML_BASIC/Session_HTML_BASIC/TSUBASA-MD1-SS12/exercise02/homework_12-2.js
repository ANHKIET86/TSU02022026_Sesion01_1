// ===== Bài 1: Chuyển độ C sang độ F =====
let c = Number(prompt("Bài 1: Nhập độ C"));
let f = (c * 9/5) +32;
console.log("Độ F là " + f);

// ===== Bài 2: Chuyển mét sang feet =====
// 1 mét = 3.28084 feet
let m = Number(prompt("Bài 2: Nhập số mét"));
let feet = m * 3.28084;
console.log("Feet là: " + feet );

// ===== Bài 3: Diện tích hình vuông =====
let a = Number(prompt("Bài 3: Nhập cạnh hình vuông"));
let aquare = a * a;
console.log("Diện tích hình vuông là " + aquare);

// ===== Bài 4: Diện tích hình chữ nhật =====
let dai = Number(prompt("Bài 4: Nhập độ dài hình chữ nhật: "));
let rong = Number(prompt("Bài 4: Nhập độ rộng hình chữ nhật: "));
let dthcn = dai * rong;
console.log("Diện hình chữ nhật là: " + dthcn);

// ===== Bài 5: Diện tích tam giác vuông =====
let a2 = Number(prompt("Bài 5: Nhập cạnh a"));
let b2 = Number(prompt("Bài 5: Nhập cạnh b"));
let triangleArea = (a2 * b2) / 2;
console.log("Diện tích tam giác vuông: " + triangleArea);


// ===== Bài 6: Giải phương trình bậc 1 =====
// ax + b = 0
let a3 = Number(prompt("Bài 6: Nhập số a"));
let b3 = Number(prompt("Bài 6: Nhập số b"));

if (a3 === 0 ){ 
    console.log("Phương trình vô nghiệm.");
}else{  
    let x = -b3 /a3;
    console.log("Nghiệm x = " + x);
}

// ===== Bài 7: Giải phương trình bậc 2 =====
// ax² + bx + c = 0
let a4 = Number(prompt("Bài 7: Nhập a"));
let b4 = Number(prompt("Bài 7: Nhập b"));
let c4 = Number(prompt("Bài 7: Nhập c"));

let delta = b4*b4 - 4*a4*c4;

if (delta < 0) {
    console.log("Phương trình vô nghiệm");
} 
else if (delta === 0) {
    let x = -b4 / (2*a4);
    console.log("Phương trình có nghiệm kép x = " + x);
} 
else {
    let x1 = (-b4 + Math.sqrt(delta)) / (2*a4);
    let x2 = (-b4 - Math.sqrt(delta)) / (2*a4);
    console.log("x1 = " + x1);
    console.log("x2 = " + x2);
}


// ===== Bài 8: Kiểm tra tuổi =====
let tuoi = Number(prompt("Bài 8: Nhập tuổi: "));

if (tuoi > 0 && tuoi < 120){ 
    console.log("Đây là tuổi của 1 người.");
}else { 
    console.log("Đây không phải là tuổi hợp lệ.");
}