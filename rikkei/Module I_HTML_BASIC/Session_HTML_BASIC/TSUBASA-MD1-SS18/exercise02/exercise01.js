let products = [
  { id: 1, name: 'Milk', count: 100 },
  { id: 2, name: 'Orange', count: 100 },
  { id: 3, name: 'Butter', count: 100 }
];

// 1. Thêm sản phẩm
let newProduct = { id: 4, name: 'Apple', count: 50 };
products.push(newProduct);

// 2. Xóa sản phẩm id = 2
products = products.filter(p => p.id !== 2);

// 3. Cập nhật sản phẩm id = 3 → count = 0
let product3 = products.find(p => p.id === 3);
if (product3) {
  product3.count = 0;
}

// 4. Kiểm tra Butter có không
let butter = products.find(p => p.name === "Butter");

if (butter) {
  console.log("Tìm thấy Butter:", butter);
} else {
  console.log("Không có dữ liệu bạn tìm kiếm");
}

console.log("Danh sách products:", products);