const STORAGE_KEY = "bookmark_app_v1";

let bookmarks = []; // {id, name, url, createdAt}

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const bookmarksEl = document.getElementById("bookmarks");

const form = document.getElementById("form");
const nameInput = document.getElementById("nameInput");
const urlInput = document.getElementById("urlInput");
const errorEl = document.getElementById("error");

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

function load() {
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    bookmarks = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(bookmarks)) bookmarks = [];
  } catch {
    bookmarks = [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

function normalizeUrl(url) {
  let u = (url ?? "").toString().trim();
  if (!u) return "";
  // nếu user nhập "google.com" thì tự thêm https://
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

function isValidUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toUpperCase(); }
  catch { return "WEBSITE"; }
}

function faviconUrl(url) {
  // dùng favicon service của Google
  try{
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(u.hostname)}&sz=64`;
  } catch {
    return "";
  }
}

// ===== Modal control =====
function openModal() {
  errorEl.textContent = "";
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => nameInput.focus(), 0);
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  form.reset();
  errorEl.textContent = "";
}

modal.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

// ===== Render =====
function render() {
  bookmarksEl.innerHTML = "";

  bookmarks.forEach((b) => {
    const card = document.createElement("div");
    card.className = "card";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-x";
    closeBtn.textContent = "×";
    closeBtn.title = "Delete";
    closeBtn.addEventListener("click", () => removeBookmark(b.id));

    const a = document.createElement("a");
    a.href = b.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.className = "favicon";
    img.alt = "";
    const fav = faviconUrl(b.url);
    if (fav) img.src = fav;

    const label = document.createElement("span");
    label.textContent = `${(b.name || domainOf(b.url)).toUpperCase()} - ${domainOf(b.url)}`;

    // Nếu muốn giống hình hơn: chỉ hiện "NAME - TAGLINE" cố định.
    // Ở đây dùng: NAME - DOMAIN (đơn giản, tự sinh)

    a.appendChild(img);
    a.appendChild(label);

    card.appendChild(closeBtn);
    card.appendChild(a);

    bookmarksEl.appendChild(card);
  });
}

// ===== CRUD =====
function addBookmark(name, url) {
  bookmarks.unshift({
    id: uid(),
    name: name.trim(),
    url,
    createdAt: Date.now()
  });
  save();
  render();
}

function removeBookmark(id) {
  bookmarks = bookmarks.filter(x => x.id !== id);
  save();
  render();
}

// ===== Events =====
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const name = (nameInput.value ?? "").toString().trim();
  const url = normalizeUrl(urlInput.value);

  if (!name) {
    errorEl.textContent = "Vui lòng nhập Website Name.";
    nameInput.focus();
    return;
  }
  if (!url || !isValidUrl(url)) {
    errorEl.textContent = "URL không hợp lệ. Ví dụ: https://google.com";
    urlInput.focus();
    return;
  }

  // chống trùng (theo url)
  const exists = bookmarks.some(b => b.url.toLowerCase() === url.toLowerCase());
  if (exists) {
    errorEl.textContent = "Website này đã được lưu.";
    return;
  }

  addBookmark(name, url);
  closeModal();
});

// ===== Init =====
load();
render();