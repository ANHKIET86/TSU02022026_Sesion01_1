// Khai báo mảng số nguyên có sẵn (10–20 phần tử)
const arr = [3, 5, 7, 5, 10, 12, 5, 9, 10, 1, 5, 20]; // 12 phần tử

const arrText = document.getElementById("arrText");
const kInput = document.getElementById("kInput");
const checkBtn = document.getElementById("checkBtn");
const resultEl = document.getElementById("result");

arrText.textContent = `[${arr.join(", ")}]`;

function parseIntStrict(value) {
  const n = Number(String(value).trim());
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

function countOccurrences(array, k) {
  let count = 0;
  for (const x of array) {
    if (x === k) count++;
  }
  return count;
}

function handleCheck() {
  const k = parseIntStrict(kInput.value);

  if (k === null) {
    resultEl.textContent = "Vui lòng nhập số nguyên k hợp lệ.";
    kInput.focus();
    return;
  }

  const count = countOccurrences(arr, k);
  resultEl.textContent = `Số ${k} xuất hiện ${count} lần trong mảng.`;
}

checkBtn.addEventListener("click", handleCheck);

kInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCheck();
});