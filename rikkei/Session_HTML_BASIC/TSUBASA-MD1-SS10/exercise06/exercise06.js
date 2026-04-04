function askNumber(message) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) return null; // user bấm Cancel

    const n = Number(String(raw).trim());
    if (Number.isFinite(n)) return n;

    alert("Giá trị không hợp lệ, vui lòng nhập lại số.");
  }
}

function askOperator(message) {
  const allowed = ["+", "-", "*", "/"];

  while (true) {
    const raw = prompt(message);
    if (raw === null) return null;

    const op = String(raw).trim();
    if (allowed.includes(op)) return op;

    alert("Phép tính không hợp lệ. Chỉ chấp nhận: +, -, *, /");
  }
}

function calc(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    default: return null;
  }
}

// ===== Run =====
(function run() {
  const a = askNumber("Mời bạn nhập vào số a");
  if (a === null) return;

  const b = askNumber("Mời bạn nhập vào số b");
  if (b === null) return;

  const op = askOperator("Mời bạn nhập vào các phép tính (+, -, *, /)");
  if (op === null) return;

  const result = calc(a, b, op);

  if (result === null) {
    alert(`Không thể thực hiện phép tính: ${a} ${op} ${b} (không chia được cho 0).`);
    return;
  }

  alert(`Kết quả của phép tính trên: ${a} ${op} ${b} = ${result}`);
})();