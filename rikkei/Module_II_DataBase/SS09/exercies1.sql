CREATE DATABASE ss09_tsu202;
USE ss09_tsu202;

CREATE TABLE categories(
	cat_id INT PRIMARY KEY,
    cat_name VARCHAR(255) NOT NULL
);

CREATE TABLE products(
	pro_id INT PRIMARY KEY,
    pro_name VARCHAR(255) NOT NULL,
    pro_price DECIMAL(15,2) NOT NULL CHECK (pro_price >= 0),
    cat_id INT,
    FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
);

INSERT INTO categories
VALUES(1, 'Quần áo'),
(2, 'Mỹ phẩm'),
(3, 'Gia dụng'),
(4, 'Nội thất'),
(5, 'Thực phẩm');
-- Câu 1 -> xong
INSERT INTO products
VALUES(3, 'Son môi', 4000, 2),
(4, 'Phấn hồng', 9000, 2),
(5, 'Dao thái', 1500, 3);
-- Câu 2: Cập nhật giá -> dùng nhóm lệnh DML để thay đổi dữ liệu
UPDATE products
SET pro_price = 7000
WHERE pro_id = 1;
-- Câu 3: Xóa một sản phẩm có tên là Son môi
-- Tắt đi chế độ safe update mode 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM products
WHERE pro_name = 'Son môi';
-- Lỗi Safe update mode là do cơ chế mặc định của mysql không cho phép xóa nhiều dữ liệu
-- Câu 4: Hiển thị tất cả sản phẩm, sắp xếp theo giá
SELECT pro_name, pro_price
FROM products
ORDER BY pro_price ASC;  -- Giảm dần DESC
-- Câu 5: Thống kê số lượng sản phẩm cho từng danh mục
-- Danh mục | Số lượng
-- Quần áo  | 2
-- Mỹ Phẩm  | 1
-- Nhiệm vụ đầu tiên, lấy ra những danh mục có sản phẩm
-- Dùng join để tìm điểm chung
SELECT c.cat_name as 'Tên danh mục', COUNT(p.pro_id) as 'Số lượng'
FROM categories as c
LEFT JOIN products as p
ON c.cat_id = p.cat_id
GROUP BY c.cat_name;