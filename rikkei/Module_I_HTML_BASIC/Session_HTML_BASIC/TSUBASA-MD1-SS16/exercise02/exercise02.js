function minOfArray(array) {
  if (!Array.isArray(array)) {
    alert('Dữ liệu không hợp lệ');
    return;
  }
  if (array.length === 0) {
    alert('Mảng không có phần tử');
    return;
  }
  let min = Infinity;
  for (let i = 0; i < array.length; i++) {
    if (min > array[i]) {
      min = array[i];
    }
  }
  return min;
}

const arr1 = [3, 5, 1, 8, -3, 7, 8];
let min1 = minOfArray(arr1);
console.log(`min của mảng arr1 là: ${min1}`);

const arr2 = [7, 12, 6, 9, 20, 56, 89];
let min2 = minOfArray(arr2);
console.log(`min của mảng arr2 là: ${min1}`);

const arr3 = [];
let min3 = minOfArray(arr3);
console.log(`min của mảng arr3 là: ${min3}`);

const arr4 = [0, 0, 0, 0, 0, 0];
let min4 = minOfArray(arr4);
console.log(`min của mảng arr4 là: ${min4}`);