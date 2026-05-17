CREATE DATABASE ss06_exercises;
USE ss06_exercises;

-- Tao bang danh muc
CREATE TABLE categories(
    cat_id CHAR(10) PRIMARY KEY,
    cat_name VARCHAR(100) NOT NULL UNIQUE
);

-- Tao bang san pham
CREATE TABLE products(
    pro_id CHAR(10) PRIMARY KEY,
    pro_name VARCHAR(255) NOT NULL,
    pro_price DECIMAL(15,2) NOT NULL CHECK(pro_price >= 0),
    pro_quantity INT DEFAULT 0 CHECK(pro_quantity >= 0),
    pro_brand VARCHAR(100) NOT NULL,
    pro_date DATE DEFAULT (CURRENT_DATE),
    cat_id CHAR(10),
    FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
);

-- Them du lieu vao categories
INSERT INTO categories
VALUES
('cat001', 'Quan Ao'),
('cat002', 'Dien Tu'),
('cat003', 'Noi That');

-- Them du lieu vao products
INSERT INTO products
VALUES
('p001', 'Ao so mi', 200000, 20, 'Viet Tien', '2026-05-11', 'cat001'),
('p002', 'Laptop Dell', 15000000, 10, 'Dell', '2026-05-11', 'cat002'),
('p003', 'Ban hoc', 3000000, 5, 'Hoa Phat', '2026-05-11', 'cat003');

-- Them 3 san pham moi
INSERT INTO products
VALUES
('p004', 'Ao khoac', 500000, 15, 'Yody', '2026-05-11', 'cat001'),
('p005', 'Iphone 15', 25000000, 8, 'Apple', '2026-05-11', 'cat002'),
('p006', 'Tu quan ao', 7000000, 6, 'Xuan Hoa', '2026-05-11', 'cat003');

-- Cap nhat gia san pham
UPDATE products
SET pro_price = 16000000
WHERE pro_id = 'p002';

-- Kiem tra lai du lieu sau update
SELECT * FROM products;

-- Xoa mot san pham
DELETE FROM products
WHERE pro_id = 'p004';

-- Kiem tra lai du lieu sau delete
SELECT * FROM products;

-- Hien thi tat ca san pham sap xep theo gia giam dan
SELECT *
FROM products
ORDER BY pro_price DESC;

-- Thong ke so luong san pham theo tung danh muc
SELECT c.cat_id,
       c.cat_name,
       COUNT(p.pro_id) AS 'So luong san pham'
FROM categories AS c
INNER JOIN products AS p
ON c.cat_id = p.cat_id
GROUP BY c.cat_id, c.cat_name;