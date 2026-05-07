(() => {
  const PRODUCT_STORAGE_KEY = "products_v1";
  const PAGE_SIZE = 8;

  const table = document.getElementById("productTable");
  const tbody = table?.querySelector("tbody");
  const paginationEl = document.getElementById("pagination");
  const searchInput = document.getElementById("searchProduct");
  const filterCategory = document.getElementById("filterCategory");
  const filterStatus = document.getElementById("filterStatus");

  const productOverlay = document.getElementById("productOverlay");
  const productForm = document.getElementById("productForm");
  const productModalTitle = document.getElementById("productModalTitle");
  const btnOpenAdd = document.getElementById("btnOpenAddProduct");
  const btnCloseProduct = document.getElementById("btnCloseProduct");
  const btnCancelProduct = document.getElementById("btnCancelProduct");
  const btnSubmitProduct = document.getElementById("btnSubmitProduct");

  const pId = document.getElementById("pId");
  const pName = document.getElementById("pName");
  const pCategory = document.getElementById("pCategory");
  const pImage = document.getElementById("pImage");
  const pQty = document.getElementById("pQty");
  const pPrice = document.getElementById("pPrice");
  const pDiscount = document.getElementById("pDiscount");
  const pDesc = document.getElementById("pDesc");

  const errPId = document.getElementById("errPId");
  const errPName = document.getElementById("errPName");
  const errPCategory = document.getElementById("errPCategory");
  const errPImage = document.getElementById("errPImage");

  const toastWrap = document.getElementById("toastWrap");
  const confirmOverlay = document.getElementById("confirmOverlay");
  const confirmText = document.getElementById("confirmText");
  const btnConfirmCancel = document.getElementById("btnConfirmCancel");
  const btnConfirmOk = document.getElementById("btnConfirmOk");

  let currentMode = "add";
  let editingId = null;
  let pendingDeleteId = null;
  let currentPage = 1;
  let keyword = "";
  let selectedCategory = "";
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

  function formatCurrency(value) {
    return `${Number(value || 0).toLocaleString("vi-VN")} đ`;
  }

  function renderStatusBadge(status) {
    return status === "on"
      ? '<span class="badge badge--on"><span class="dot"></span>Đang hoạt động</span>'
      : '<span class="badge badge--off"><span class="dot"></span>Ngừng hoạt động</span>';
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function rowTemplate(product) {
    return `
      <tr data-id="${escapeHtml(product.id)}">
        <td class="cell-id"><b>${escapeHtml(product.id)}</b></td>
        <td class="cell-name">${escapeHtml(product.name)}</td>
        <td class="cell-price">${formatCurrency(product.price)}</td>
        <td class="cell-qty">${escapeHtml(product.qty)}</td>
        <td class="cell-discount">${escapeHtml(product.discount)}%</td>
        <td class="cell-status">${renderStatusBadge(product.status)}</td>
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

  function loadProducts() {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveProducts(list) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(list));
  }

  function getList() {
    return loadProducts() || [];
  }

  function seedFromHTMLIfEmpty() {
    const stored = loadProducts();
    if (stored && Array.isArray(stored) && stored.length) return;

    const seed = [...(tbody?.querySelectorAll("tr") || [])].map((tr) => ({
      id: tr.dataset.id || tr.querySelector(".cell-id")?.textContent?.trim() || "",
      name: tr.dataset.name || tr.querySelector(".cell-name")?.textContent?.trim() || "",
      category: tr.dataset.category || "Điện thoại",
      status: tr.dataset.status || "on",
      qty: Number(tr.dataset.qty || tr.querySelector(".cell-qty")?.textContent?.trim() || 0),
      price: Number(tr.dataset.price || 0),
      discount: Number(tr.dataset.discount || 0),
      image: tr.dataset.image || "",
      desc: tr.dataset.desc || "",
    }));

    saveProducts(seed);
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

  function filteredList() {
    return getList().filter((product) => {
      const matchesKeyword = !keyword || product.name.toLowerCase().includes(keyword);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;
      return matchesKeyword && matchesCategory && matchesStatus;
    });
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

  function hideErr(input, err) {
    input?.classList.remove("is-invalid");
    err?.classList.remove("is-show");
  }

  function showErr(input, err, message) {
    input?.classList.add("is-invalid");
    err?.classList.add("is-show");
    if (message && err) err.textContent = message;
  }

  function resetErrors() {
    errPId.textContent = "Mã sản phẩm không được để trống";
    errPName.textContent = "Tên sản phẩm không được để trống";
    errPCategory.textContent = "Danh mục không được để trống";
    errPImage.textContent = "Hình ảnh không được để trống";

    hideErr(pId, errPId);
    hideErr(pName, errPName);
    hideErr(pCategory, errPCategory);
    hideErr(pImage, errPImage);
  }

  function showToast(title, message) {
    if (!toastWrap) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast__icon"><i class="fa-solid fa-check" style="font-size:11px"></i></div>
      <div>
        <div class="toast__title">${escapeHtml(title)}</div>
        <div class="toast__msg">${escapeHtml(message)}</div>
      </div>
      <button class="toast__close" type="button" aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button>
    `;

    const close = () => toast.remove();
    toast.querySelector(".toast__close")?.addEventListener("click", close);
    toastWrap.appendChild(toast);
    setTimeout(close, 2500);
  }

  function openAdd() {
    currentMode = "add";
    editingId = null;
    productModalTitle.textContent = "Thêm mới sản phẩm";
    btnSubmitProduct.textContent = "Thêm";

    productForm.reset();
    resetErrors();

    productForm.elements.status.value = "on";
    pQty.value = 1;
    pPrice.value = 10000000;
    pDiscount.value = 10;
    pId.readOnly = false;

    openOverlay(productOverlay);
    setTimeout(() => pId.focus(), 0);
  }

  function openEdit(product) {
    currentMode = "edit";
    editingId = product.id;
    productModalTitle.textContent = "Cập nhật sản phẩm";
    btnSubmitProduct.textContent = "Lưu";

    productForm.reset();
    resetErrors();

    pId.value = product.id;
    pName.value = product.name;
    pCategory.value = product.category;
    productForm.elements.status.value = product.status || "on";
    pQty.value = product.qty ?? 1;
    pPrice.value = product.price ?? 0;
    pDiscount.value = product.discount ?? 0;
    pImage.value = product.image ?? "";
    pDesc.value = product.desc ?? "";
    pId.readOnly = true;

    openOverlay(productOverlay);
    setTimeout(() => pName.focus(), 0);
  }

  function closeProduct() {
    closeOverlay(productOverlay);
    productForm.reset();
    resetErrors();
    currentMode = "add";
    editingId = null;
  }

  function closeConfirm() {
    pendingDeleteId = null;
    closeOverlay(confirmOverlay);
  }

  function productIdExists(id) {
    return getList().some((product) => product.id === id);
  }

  searchInput?.addEventListener("input", (event) => {
    keyword = event.target.value.trim().toLowerCase();
    currentPage = 1;
    render();
  });

  filterCategory?.addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    currentPage = 1;
    render();
  });

  filterStatus?.addEventListener("change", (event) => {
    selectedStatus = event.target.value;
    currentPage = 1;
    render();
  });

  paginationEl?.addEventListener("click", (event) => {
    const button = event.target.closest("button.page");
    if (!button || button.disabled) return;

    const total = getTotalPages(filteredList().length);
    const value = button.dataset.page;

    if (value === "prev") currentPage = Math.max(1, currentPage - 1);
    else if (value === "next") currentPage = Math.min(total, currentPage + 1);
    else currentPage = Number(value);

    render();
  });

  pId?.addEventListener("input", () => hideErr(pId, errPId));
  pName?.addEventListener("input", () => hideErr(pName, errPName));
  pCategory?.addEventListener("change", () => hideErr(pCategory, errPCategory));
  pImage?.addEventListener("input", () => hideErr(pImage, errPImage));

  btnOpenAdd?.addEventListener("click", openAdd);
  btnCloseProduct?.addEventListener("click", closeProduct);
  btnCancelProduct?.addEventListener("click", closeProduct);
  productOverlay?.addEventListener("click", (event) => {
    if (event.target === productOverlay) closeProduct();
  });

  productForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    resetErrors();

    const id = pId.value.trim();
    const name = pName.value.trim();
    const category = pCategory.value.trim();
    const status = productForm.elements.status.value;
    const qty = Number(pQty.value || 0);
    const price = Number(pPrice.value || 0);
    const discount = Number(pDiscount.value || 0);
    const image = pImage.value.trim();
    const desc = pDesc.value.trim();

    let isValid = true;
    if (!id) {
      showErr(pId, errPId);
      isValid = false;
    }
    if (!name) {
      showErr(pName, errPName);
      isValid = false;
    }
    if (!category) {
      showErr(pCategory, errPCategory);
      isValid = false;
    }
    if (!image) {
      showErr(pImage, errPImage);
      isValid = false;
    }
    if (!isValid) return;

    const list = getList();

    if (currentMode === "add") {
      if (productIdExists(id)) {
        showErr(pId, errPId, "Mã sản phẩm đã tồn tại");
        return;
      }

      list.push({ id, name, category, status, qty, price, discount, image, desc });
      saveProducts(list);
      currentPage = getTotalPages(filteredList().length);
      showToast("Thành công", "Thêm sản phẩm thành công");
    } else {
      const index = list.findIndex((product) => product.id === editingId);
      if (index === -1) return;

      list[index] = { ...list[index], name, category, status, qty, price, discount, image, desc };
      saveProducts(list);
      showToast("Thành công", "Cập nhật sản phẩm thành công");
    }

    closeProduct();
    render();
  });

  table?.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;

    const row = actionButton.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const action = actionButton.dataset.action;

    if (action === "edit") {
      const product = getList().find((item) => item.id === id);
      if (!product) return;
      openEdit(product);
      return;
    }

    if (action === "delete") {
      pendingDeleteId = id;
      const name = row.querySelector(".cell-name")?.textContent?.trim() || "";
      confirmText.textContent = `Bạn có chắc chắn muốn xóa "${name}" khỏi hệ thống không?`;
      openOverlay(confirmOverlay);
    }
  });

  btnConfirmCancel?.addEventListener("click", closeConfirm);
  confirmOverlay?.addEventListener("click", (event) => {
    if (event.target === confirmOverlay) closeConfirm();
  });

  btnConfirmOk?.addEventListener("click", () => {
    if (!pendingDeleteId) return;

    const list = getList().filter((product) => product.id !== pendingDeleteId);
    saveProducts(list);

    const visibleList = filteredList().filter((product) => product.id !== pendingDeleteId);
    currentPage = clampPage(currentPage, getTotalPages(visibleList.length));

    closeConfirm();
    render();
    showToast("Thành công", "Xóa sản phẩm thành công");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (productOverlay?.classList.contains("is-open")) closeProduct();
    if (confirmOverlay?.classList.contains("is-open")) closeConfirm();
  });

  seedFromHTMLIfEmpty();
  render();
})();
