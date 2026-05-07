const STORAGE_KEY = "students_app_v1";

let students = [];       // {id, name, age, className, createdAt}
let editingId = null;    // id sinh viên đang sửa

// Elements
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const classInput = document.getElementById("classInput");
const submitBtn = document.getElementById("submitBtn");
const searchInput = document.getElementById("searchInput");
const tbody = document.getElementById("tbody");
const totalCount = document.getElementById("totalCount");
const shownCount = document.getElementById("shownCount");
const clearBtn = document.getElementById("clearBtn");

// Utils
const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    students = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(students)) students = [];
  } catch {
    students = [];
  }
}

function sanitize(s) {
  return (s ?? "").toString().trim();
}

function parseAge(v) {
  const n = Number(String(v).trim());
  if (!Number.isFinite(n)) return null;
  // tuổi thường 1..120 (bạn muốn khác thì đổi)
  if (n < 1 || n > 120) return null;
  return Math.floor(n);
}

function setModeAdd() {
  editingId = null;
  submitBtn.textContent = "Thêm sinh viên";
}

function setModeEdit() {
  submitBtn.textContent = "Lưu";
}

function resetForm() {
  nameInput.value = "";
  ageInput.value = "";
  classInput.value = "";
}

// CRUD
function addStudent({ name, age, className }) {
  students.unshift({
    id: uid(),
    name,
    age,
    className,
    createdAt: Date.now(),
  });
  save();
}

function startEdit(id) {
  const st = students.find(s => s.id === id);
  if (!st) return;

  editingId = id;
  nameInput.value = st.name;
  ageInput.value = st.age;
  classInput.value = st.className;
  setModeEdit();
  nameInput.focus();
  render();
}

function updateStudent(id, { name, age, className }) {
  const st = students.find(s => s.id === id);
  if (!st) return;

  st.name = name;
  st.age = age;
  st.className = className;
  save();
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  if (editingId === id) {
    setModeAdd();
    resetForm();
  }
  save();
}

function clearAll() {
  if (students.length === 0) return;
  const ok = confirm("Bạn có chắc muốn xoá tất cả sinh viên?");
  if (!ok) return;
  students = [];
  editingId = null;
  resetForm();
  setModeAdd();
  save();
  render();
}

// Search / Render
function getFilteredStudents() {
  const q = sanitize(searchInput.value).toLowerCase();
  if (!q) return students;
  return students.filter(s => s.name.toLowerCase().includes(q));
}

function render() {
  const filtered = getFilteredStudents();
  tbody.innerHTML = "";

  filtered.forEach((s) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = s.name;

    const tdAge = document.createElement("td");
    tdAge.textContent = String(s.age);

    const tdClass = document.createElement("td");
    tdClass.textContent = s.className;

    const tdActions = document.createElement("td");
    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.className = "action-btn btn-edit";
    editBtn.textContent = "Sửa";
    editBtn.addEventListener("click", () => startEdit(s.id));

    const delBtn = document.createElement("button");
    delBtn.className = "action-btn btn-del";
    delBtn.textContent = "Xoá";
    delBtn.addEventListener("click", () => {
      const ok = confirm(`Xoá sinh viên "${s.name}"?`);
      if (!ok) return;
      deleteStudent(s.id);
      render();
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    tdActions.appendChild(actions);

    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdClass);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });

  totalCount.textContent = String(students.length);
  shownCount.textContent = String(filtered.length);
  clearBtn.disabled = students.length === 0;
}

// Submit
function submit() {
  const name = sanitize(nameInput.value);
  const age = parseAge(ageInput.value);
  const className = sanitize(classInput.value);

  if (!name) {
    alert("Vui lòng nhập tên sinh viên.");
    nameInput.focus();
    return;
  }
  if (age === null) {
    alert("Tuổi không hợp lệ (1 - 120).");
    ageInput.focus();
    return;
  }
  if (!className) {
    alert("Vui lòng nhập lớp.");
    classInput.focus();
    return;
  }

  if (editingId) {
    updateStudent(editingId, { name, age, className });
    setModeAdd();
  } else {
    addStudent({ name, age, className });
  }

  resetForm();
  save();
  render();
  nameInput.focus();
}

// Events
submitBtn.addEventListener("click", submit);

[nameInput, ageInput, classInput].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
    if (e.key === "Escape") {
      setModeAdd();
      resetForm();
      render();
    }
  });
});

searchInput.addEventListener("input", render);
clearBtn.addEventListener("click", clearAll);

// Init
load();
setModeAdd();
render();