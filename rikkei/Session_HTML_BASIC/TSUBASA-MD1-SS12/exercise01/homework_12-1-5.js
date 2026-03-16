let a = Number(prompt("Nhập điểm kiểm tra: "));
let b = Number(prompt("Nhập điểm thi giữa kì: "));
let c = Number(prompt("Nhập điểm thi cuối kì: "));

let average = (a + b*2 + c*3)/6

if (average >= 9){
    console.log("Xuất sắc");
}else if (average >= 8){   
    console.log("Giỏi");
}else if (average >= 6.5){   
    console.log("Khá");
}else if (average >= 5){   
    console.log("Trung bình");
}else{  
    console.log("Yếu");
}