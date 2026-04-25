let choice = Number(prompt(
`Chọn bài muốn chạy:
1. Đếm từ 1 đến 100
2. Kiểm tra nhiệt độ
3. 20 số Fibonacci đầu tiên
4. Fibonacci đầu tiên chia hết cho 5
5. Tổng 20 số Fibonacci
6. Tổng 30 số chia hết cho 7
7. FizzBuzz`
));

switch(choice){
// ===== Bài 1 =====
case 1:
    for (let i = 1; i<=100; i++){   
        console.log(i);
        if(i=== 99){    
            alert("Đã hoàn thành.");
        }
    }

break;

// ===== Bài 2 =====
case 2:
    let C = Number(prompt("Nhập nhiệt độ hiện tại:"));
    if (C > 100 ){  
        alert("Hãy giảm nhiệt độ.");
    }else if (C < 20){
        alert("Hãy tăng nhiệt độ.");
    }else {
        alert("Nhiệt độ bình thường.");
    }
break;

// ===== Bài 3 =====
case 3:
    let a = 0, b = 1;

    for(let i = 1; i <= 20; i++){
        console.log(a);

        let c = a + b;
        a = b;
        b = c;
    }
break;

// ===== Bài 4 =====
case 4:
    let x = 0, y = 1;

    while(true){
        let z = x + y;
        x = y;
        y = z;

        if(x % 5 === 0 && x !== 0){
            console.log("Fibonacci đầu tiên chia hết cho 5 là: " + x);
            break;
        }
    }
break;

// ===== Bài 5 =====
case 5:
    let d = 0, e = 1, sum = 0;

    for(let i = 1; i <= 20; i++){
        sum += d;

        let f = d + e;
        d = e;
        e = f;
    }
    console.log("Tổng của 20 số đầu tiên trong dãy Fibonacci là: " + sum);
break;

// ===== Bài 6 =====
case 6:
    let count = 0, number = 1, total = 0;

    while(count < 30){  
        if(number % 7 === 0){   
            total += number;
            count++;
        }
        number++;
    }
    console.log("Tổng 30 số chia hết cho 7: " + total);
break;

// ===== Bài 7 =====
case 7:
    for(let i = 1; i<=100; i++){    
        if(i % 5 === 0 && i % 3 === 0){ 
            console.log("FizzBuzz");
        }else if(i % 3 === 0){ 
            console.log("Fizz");
        }else if(i % 5 === 0){ 
            console.log("Buzz");
        }else{
            console.log(i);
        }
    }
break;

default:
    alert("Không có bài này");
}