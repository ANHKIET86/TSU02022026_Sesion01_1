function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
      if (str[left] !== str[right]) {
          return false;
      }
      left++;
      right--;
  }
  return true;
}

let input = prompt("Nhập chuỗi:");

if (isPalindrome(input)) {
  alert("Đây là chuỗi đối xứng");
} else {
  alert("Đây không phải chuỗi đối xứng");
}