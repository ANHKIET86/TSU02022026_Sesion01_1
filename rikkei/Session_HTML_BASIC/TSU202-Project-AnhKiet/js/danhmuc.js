(() => {
  const STORAGE_KEY = "categories_v1";
  const PAGE_SIZE = 8;

  const table = document.getElementById("categoryTable");
  const tbody = document.getElementById("categoryTbody") || table?.querySelector("tbody");
  const paginationEl = document.getElementById("pagination");
  const searchInput = document.getElementById("searchCategory");
  const filterStatus = document.getElementById("filterStatus");

  const editOverlay = document.getElementById("editOverlay");
  const editForm = document.getElementById("editForm");
  const fId = document.getElementById("fId");
  const fName = document.getElementById("fName");
  const errEditName = document.getElementById("errEditName");
  const btnCloseEdit = document.getElementById("btnCloseModal");
  const btnCancelEdit = document.getElementById("btnCancel");

  const btnOpenAdd = document.getElementById("btnOpenAdd");
  const addOverlay = document.getElementById("addOverlay");
  const addForm = document.getElementById("addForm");
  const btnCloseAdd = document.getElementById("btnCloseAdd");
  const btnCancelAdd = document.getElementById("btnCancelAdd");
  const aId = document.getElementById("aId");
  const aName = document.getElementById("aName");
  const errId = document.getElementById("errId");
  const errName = document.getElementById("errName");

  const toastWrap = document.getElementById("toastWrap");
  const confirmOverlay = document.getElementById("confirmOverlay");
  const confirmText = document.getElementById("confirmText");
  const btnConfirmCancel = document.getElementById("btnConfirmCancel");
  const btnConfirmOk = document.getElementById("btnConfirmOk");

  let editingId = null;
  let pendingDeleteId = null;
  let currentPage = 1;
  let keyword = "";
  let selectedStatus = "";

  function openOverlay(el) {
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
  }


  function closeOverlay(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderStatusBadge(status) {
    return status === "on"
      ? '<span class="badge badge--on"><span class="dot"></span>Đang hoạt động</span>'
      : '<span class="badge badge--off"><span class="dot"></span>Ngừng hoạt động</span>';
  }

  function rowTemplate(item) {
    return `
      <tr data-id="${escapeHtml(item.id)}">
        <td class="cell-id"><b>${escapeHtml(item.id)}</b></td>
        <td class="cell-name">${escapeHtml(item.name)}</td>
        <td class="cell-status">${renderStatusBadge(item.status)}</td>
        <td class="th-center">
          <div class="actions">
            <button class="icon-action delete" data-action="delete" type="button" title="Xóa">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button class="icon-action edit" data-action="edit" type="button" title="Sửa">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function saveCategories(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function loadCategories() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  function getList() {
    return loadCategories() || [];
  }

  function ensureSeed() {
    const stored = loadCategories();
    if (stored && stored.length) return;

    saveCategories([
      { id: "DM001", name: "Quần áo", status: "off" },
      { id: "DM003", name: "Giày dép", status: "on" },
      { id: "DM007", name: "Rau", status: "on" },
      { id: "MD008", name: "Điện thoại", status: "off" },
      { id: "DM002", name: "Máy cày", status: "on" },
      { id: "DM004", name: "Cây chổi", status: "on" },
      { id: "DM005", name: "Laptop", status: "off" },
      { id: "DM006", name: "Phụ kiện", status: "on" }
    ]);
  }

  function filteredList() {
    return getList().filter((item) => {
      const matchesKeyword = !keyword || item.name.toLowerCase().includes(keyword);
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      return matchesKeyword && matchesStatus;
    });
  }

  function getTotalPages(totalItems) {
    return Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  }

  function clampPage(page, total) {
    return Math.min(Math.max(1, page), total);
  }

  function renderPagination(totalItems) {
    const total = getTotalPages(totalItems);
    currentPage = clampPage(currentPage, total);

    const parts = [];
    parts.push(`<button class="page" data-page="prev" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-arrow-left"></i></button>`);
    for (let i = 1; i <= total; i += 1) {
      parts.push(`<button class="page ${i === currentPage ? "is-active" : ""}" data-page="${i}">${i}</button>`);
    }
    parts.push(`<button class="page" data-page="next" ${currentPage === total ? "disabled" : ""}><i class="fa-solid fa-arrow-right"></i></button>`);

    paginationEl.innerHTML = parts.join("");
  }

  function render() {
    const list = filteredList();
    const total = getTotalPages(list.length);
    currentPage = clampPage(currentPage, total);

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = pageItems.map(rowTemplate).join("");
    renderPagination(list.length);
  }

  function showToast(title, message) {
    if (!toastWrap) return;

    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `
      <div class="toast__icon"><i class="fa-solid fa-check" style="font-size:11px"></i></div>
      <div>
        <div class="toast__title">${escapeHtml(title)}</div>
        <div class="toast__msg">${escapeHtml(message)}</div>
      </div>
      <button class="toast__close" type="button" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
    `;

    const close = () => el.remove();
    el.querySelector(".toast__close")?.addEventListener("click", close);
    toastWrap.appendChild(el);
    setTimeout(close, 2500);
  }

  function resetAddErrors() {
    aId?.classList.remove("is-invalid");
    aName?.classList.remove("is-invalid");
    errId?.classList.remove("is-show");
    errName?.classList.remove("is-show");
    if (errId) errId.textContent = "Mã danh mục không được để trống";
    if (errName) errName.textContent = "Tên danh mục không được để trống";
  }

  function resetEditErrors() {
    fName?.classList.remove("is-invalid");
    errEditName?.classList.remove("is-show");
    if (errEditName) errEditName.textContent = "Tên danh mục không được để trống";
  }

  function showErr(input, err, msg) {
    input?.classList.add("is-invalid");
    err?.classList.add("is-show");
    if (msg && err) err.textContent = msg;
  }

  function categoryIdExists(id) {
    return getList().some((item) => item.id === id);
  }

  function openAdd() {
    addForm.reset();
    resetAddErrors();
    addForm.elements.status.value = "on";
    openOverlay(addOverlay);
    setTimeout(() => aId.focus(), 0);
  }

  function closeAdd() {
    closeOverlay(addOverlay);
    addForm.reset();
    resetAddErrors();
  }

  function closeEdit() {
    closeOverlay(editOverlay);
    editForm.reset();
    resetEditErrors();
    editingId = null;
  }

  function openConfirmDelete(id, name) {
    pendingDeleteId = id;
    confirmText.textContent = `Bạn có chắc chắn muốn xóa "${name}" khỏi hệ thống không?`;
    openOverlay(confirmOverlay);
  }

  function closeConfirmDelete() {
    pendingDeleteId = null;
    closeOverlay(confirmOverlay);
  }

  searchInput?.addEventListener("input", (e) => {
    keyword = e.target.value.trim().toLowerCase();
    currentPage = 1;
    render();
  });

  filterStatus?.addEventListener("change", (e) => {
    selectedStatus = e.target.value;
    currentPage = 1;
    render();
  });

  paginationEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("button.page");
    if (!btn || btn.disabled) return;

    const total = getTotalPages(filteredList().length);
    const value = btn.dataset.page;
    if (value === "prev") currentPage = Math.max(1, currentPage - 1);
    else if (value === "next") currentPage = Math.min(total, currentPage + 1);
    else currentPage = Number(value);
    render();
  });

  btnOpenAdd?.addEventListener("click", openAdd);
  btnCloseAdd?.addEventListener("click", closeAdd);
  btnCancelAdd?.addEventListener("click", closeAdd);
  addOverlay?.addEventListener("click", (e) => {
    if (e.target === addOverlay) closeAdd();
  });

  btnCloseEdit?.addEventListener("click", closeEdit);
  btnCancelEdit?.addEventListener("click", closeEdit);
  editOverlay?.addEventListener("click", (e) => {
    if (e.target === editOverlay) closeEdit();
  });

  btnConfirmCancel?.addEventListener("click", closeConfirmDelete);
  confirmOverlay?.addEventListener("click", (e) => {
    if (e.target === confirmOverlay) closeConfirmDelete();
  });

  aId?.addEventListener("input", () => {
    aId.classList.remove("is-invalid");
    errId.classList.remove("is-show");
  });

  aName?.addEventListener("input", () => {
    aName.classList.remove("is-invalid");
    errName.classList.remove("is-show");
  });

  fName?.addEventListener("input", () => {
    fName.classList.remove("is-invalid");
    errEditName.classList.remove("is-show");
  });

  addForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    resetAddErrors();

    const id = aId.value.trim();
    const name = aName.value.trim();
    const status = addForm.elements.status.value;

    let ok = true;
    if (!id) {
      showErr(aId, errId);
      ok = false;
    }
    if (!name) {
      showErr(aName, errName);
      ok = false;
    }
    if (!ok) return;

    if (categoryIdExists(id)) {
      showErr(aId, errId, "Mã danh mục đã tồn tại");
      return;
    }

    saveCategories([...getList(), { id, name, status }]);
    closeAdd();
    render();
    showToast("Thành công", "Thêm danh mục thành công");
  });

  table?.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;

    const row = actionEl.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const action = actionEl.dataset.action;

    if (action === "delete") {
      const name = row.querySelector(".cell-name")?.textContent?.trim() || "";
      openConfirmDelete(id, name);
      return;
    }

    if (action === "edit") {
      const item = getList().find((x) => x.id === id);
      if (!item) return;

      editingId = id;
      editForm.reset();
      resetEditErrors();
      fId.value = item.id;
      fName.value = item.name;
      editForm.elements.status.value = item.status || "on";
      openOverlay(editOverlay);
    }
  });

  editForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    resetEditErrors();
    if (!editingId) return;

    const newName = fName.value.trim();
    const newStatus = editForm.elements.status.value;
    if (!newName) {
      showErr(fName, errEditName);
      return;
    }

    const next = getList().map((item) =>
      item.id === editingId ? { ...item, name: newName, status: newStatus } : item
    );

    saveCategories(next);
    closeEdit();
    render();
    showToast("Thành công", "Cập nhật danh mục thành công");
  });

  btnConfirmOk?.addEventListener("click", () => {
    if (!pendingDeleteId) return;
    saveCategories(getList().filter((item) => item.id !== pendingDeleteId));
    closeConfirmDelete();
    render();
    showToast("Thành công", "Xóa danh mục thành công");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (addOverlay?.classList.contains("is-open")) closeAdd();
    if (editOverlay?.classList.contains("is-open")) closeEdit();
    if (confirmOverlay?.classList.contains("is-open")) closeConfirmDelete();
  });

  ensureSeed();
  render();
})();
