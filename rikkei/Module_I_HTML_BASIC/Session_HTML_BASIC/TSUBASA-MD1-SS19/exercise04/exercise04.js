// ===== LocalStorage key =====
const STORAGE_KEY = "todo_app_v1";

// ===== State =====
let todos = [];       // {id, text, createdAt}
let editingId = null; // đang sửa todo nào

// ===== Elements =====
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");
const pendingCountEl = document.getElementById("pendingCount");
const clearBtn = document.getElementById("clearBtn");

// ===== Utils =====
const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);
const sanitizeText = (s) => (s ?? "").toString().trim();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(todos)) todos = [];
  } catch {
    todos = [];
  }
}

function setModeAdd() {
  editingId = null;
  addBtn.textContent = "+";
  addBtn.title = "Add";
  input.placeholder = "Add your new todo";
}

function setModeEdit() {
  addBtn.textContent = "✓";
  addBtn.title = "Save";
  input.placeholder = "Update your todo";
}

// ===== Render =====
function render() {
  listEl.innerHTML = "";

  todos.forEach((t) => {
    const item = document.createElement("div");
    item.className = "item";

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = t.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.title = "Edit";
    editBtn.innerHTML = "✎";
    editBtn.addEventListener("click", () => startEdit(t.id));

    const delBtn = document.createElement("button");
    delBtn.className = "del";
    delBtn.title = "Delete";
    delBtn.innerHTML = "🗑";
    delBtn.addEventListener("click", () => removeTodo(t.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    item.appendChild(text);
    item.appendChild(actions);

    listEl.appendChild(item);
  });

  pendingCountEl.textContent = String(todos.length);
  clearBtn.disabled = todos.length === 0;
  addBtn.disabled = sanitizeText(input.value).length === 0;
}

// ===== CRUD =====
function addTodo(text) {
  todos.unshift({ id: uid(), text, createdAt: Date.now() });
  save();
  input.value = "";
  setModeAdd();
  render();
}

function startEdit(id) {
  const t = todos.find((x) => x.id === id);
  if (!t) return;

  editingId = id;
  input.value = t.text;
  setModeEdit();
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  render();
}

function updateTodo(id, newText) {
  const t = todos.find((x) => x.id === id);
  if (!t) return;

  t.text = newText;
  save();
  input.value = "";
  setModeAdd();
  render();
}

function removeTodo(id) {
  todos = todos.filter((x) => x.id !== id);
  if (editingId === id) {
    input.value = "";
    setModeAdd();
  }
  save();
  render();
}

function clearAll() {
  todos = [];
  editingId = null;
  input.value = "";
  setModeAdd();
  save();
  render();
}

// ===== Events =====
function submit() {
  const text = sanitizeText(input.value);
  if (!text) return;

  if (editingId) updateTodo(editingId, text);
  else addTodo(text);
}

addBtn.addEventListener("click", submit);

input.addEventListener("input", () => {
  addBtn.disabled = sanitizeText(input.value).length === 0;
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submit();
  if (e.key === "Escape") {
    input.value = "";
    setModeAdd();
    render();
  }
});

clearBtn.addEventListener("click", clearAll);

// ===== Init =====
load();
setModeAdd();
render();
input.focus();