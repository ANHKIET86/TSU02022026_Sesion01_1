let arr2 = ['a', '1', 'b', '5', 'c', '9'];

let count = 0;

for (let ch of arr2) {
    if (!isNaN(ch)) { // kiểm tra là số
        count++;
    }
}

console.log("Số ký tự số:", count);