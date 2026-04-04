function isEven (num) {
    if(num % 2 ===0){
      return true;
    }else{
      return false;
    }
  }
  let num = Number(prompt('Nhập 1 số nguyên :'));
alert('Kết quả : '+ isEven(num));