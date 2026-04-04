const keyboard = document.getElementById("keyboard");
const display = document.getElementById("display");

// Tạo A → Z
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

letters.split("").forEach(letter => {
    let btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "key";

    btn.onclick = () => {
        display.value += letter;
    };

    keyboard.appendChild(btn);
});

// Nút xóa
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Xóa";
deleteBtn.className = "key delete";

deleteBtn.onclick = () => {
    display.value = display.value.slice(0, -1);
};

keyboard.appendChild(deleteBtn);