const RATE = 25000; // 1 USD = 25,000 VND

function askUSD() {
  while (true) {
    const raw = prompt("Nhập số tiền Đô la Mỹ (USD):");
    if (raw === null) return null; // Cancel

    const usd = Number(String(raw).trim());
    if (Number.isFinite(usd) && usd >= 0) return usd;

    alert("Số tiền không hợp lệ. Vui lòng nhập lại (USD >= 0).");
  }
}

function formatVND(vnd) {
  // format kiểu VN: 1.234.567 đ
  return vnd.toLocaleString("vi-VN") + " đ";
}

(function run() {
  const usd = askUSD();
  if (usd === null) return;

  const vnd = usd * RATE;

  alert(
    `Tỷ giá: 1$ = ${RATE.toLocaleString("vi-VN")} đ\n` +
    `Số tiền USD: ${usd}\n` +
    `Quy đổi: ${formatVND(vnd)}`
  );
})();