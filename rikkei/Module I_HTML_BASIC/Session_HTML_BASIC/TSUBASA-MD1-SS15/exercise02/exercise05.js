let arr5 = ['a', '-', 'b', '-', 'c'];

for (let i = 0; i < arr5.length; i++) {
    if (arr5[i] === '-') {
        arr5[i] = '_';
    }
}

console.log(arr5);