// Khai báo 3 biến đại diện điểm môn học (lấy từ input)
const mathEl = document.getElementById("math");
const physicsEl = document.getElementById("physics");
const chemistryEl = document.getElementById("chemistry");

const calcBtn = document.getElementById("calcBtn");
const output = document.getElementById("output");

function parseScore(value) {
  const n = Number(String(value).trim());
  // Thường điểm 0..10, bạn có thể đổi theo thang điểm của bài
  if (!Number.isFinite(n) || n < 0 || n > 10) return null;
  return n;
}

function calcAverage(math, physics, chemistry) {
  return (math + physics + chemistry) / 3;
}

function handleCalc() {
  const math = parseScore(mathEl.value);
  const physics = parseScore(physicsEl.value);
  const chemistry = parseScore(chemistryEl.value);

  if (math === null || physics === null || chemistry === null) {
    output.textContent = "Vui lòng nhập điểm hợp lệ (0 - 10) cho cả 3 môn.";
    return;
  }

  const avg = calcAverage(math, physics, chemistry);

  output.textContent =
    `Math: ${math} | Physics: ${physics} | Chemistry: ${chemistry} ` +
    `→ Điểm trung bình: ${avg.toFixed(2)}`;
}

calcBtn.addEventListener("click", handleCalc);

// Enter để tính nhanh
[mathEl, physicsEl, chemistryEl].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCalc();
  });
});