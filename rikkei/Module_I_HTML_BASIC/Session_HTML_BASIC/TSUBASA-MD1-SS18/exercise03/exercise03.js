let products = [
  { id: 1, name: 'Milk', count: 100 },
  { id: 2, name: 'Orange', count: 100 },
  { id: 3, name: 'Butter', count: 100 }
];

// Hiển thị
function showProducts() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  products.forEach(p => {
      let li = document.createElement("li");
      li.textContent = `id: ${p.id} | name: ${p.name} | count: ${p.count}`;
      list.appendChild(li);
  });
}

// Thêm (hard-code giống bài)
function addProduct() {
  let newProduct = { id: 4, name: "Apple", count: 50 };
  products.push(newProduct);
  alert("Đã thêm Apple");
  showProducts();
}

// Xóa id = 2
function deleteId2() {
  products = products.filter(p => p.id !== 2);
  alert("Đã xóa id = 2");
  showProducts();
}

// Tìm Butter
function findButter() {
  let result = products.find(p => p.name === "Butter");

  if (result) {
      alert(`Tìm thấy: id=${result.id}, count=${result.count}`);
  } else {
      alert("Không có Butter");
  }
}