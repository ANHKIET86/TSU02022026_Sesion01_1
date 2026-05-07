const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const calcBtn = document.getElementById("calcBtn");

function parsePositiveNumber(value) {
  const n = Number(String(value).trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function calcBMI(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}

// Phân loại WHO (thường dùng trong bài tập)
function classifyWHO(bmi) {
  if (bmi < 18.5) return "Cân nặng thấp (gầy)";
  if (bmi < 25)   return "Bình thường";
  if (bmi < 30)   return "Tiền béo phì (thừa cân)";
  if (bmi < 35)   return "Béo phì độ I";
  if (bmi < 40)   return "Béo phì độ II";
  return "Béo phì độ III";
}

function handleCalc() {
  const w = parsePositiveNumber(weightEl.value);
  const h = parsePositiveNumber(heightEl.value);

  if (w === null) {
    alert("Vui lòng nhập cân nặng hợp lệ (kg > 0).");
    weightEl.focus();
    return;
  }
  if (h === null) {
    alert("Vui lòng nhập chiều cao hợp lệ (m > 0).");
    heightEl.focus();
    return;
  }

  const bmi = calcBMI(w, h);
  const type = classifyWHO(bmi);

  alert(`BMI = ${bmi.toFixed(2)}\nPhân loại: ${type}`);
}

calcBtn.addEventListener("click", handleCalc);

[weightEl, heightEl].forEach(el => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCalc();
  });
});