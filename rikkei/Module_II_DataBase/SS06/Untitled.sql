CREATE DATABASE ss06_tsu202; -- Tao co so du lieu
USE ss06_tsu202; -- Su dung DataBase
-- Co so du lieu cua cua hang co thong tin tung danh muc(quan ao, dien tu)
-- Thuoc tinh -> (Ma danh muc, ten danh muc) -> ten cot
-- Va thong tin tung san pham trong danh muc do(Aos so mi, Laptop)
-- (Ma sp, ten sp, gia sp, so luong, hang,ngay nhap, ma danh muc)
-- Buoc 1:TAo bang danh muc
CREATE TABLE categories(
-- Ten cot + Kieu du lieu + Rang buoc
    cat_id CHAR(10) PRIMARY KEY,
    cat_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products(
	pro_id CHAR(10) PRIMARY KEY,
    pro_name VARCHAR(255) NOT NULL,
    pro_price DECIMAL(15,2) NOT NULL CHECK (pro_price >= 0), -- Kiem tra so tien ko dc phep am
    pro_quantity INT DEFAULT 0 CHECK (pro_quantity >=0),
    pro_brand VARCHAR(200) NOT NULL,
    pro_date DATE DEFAULT (CURRENT_DATE),
    cat_id CHAR(10),
    FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
);

-- Them du lieu
INSERT INTO categories
VALUES ('cat001', 'Quan Ao'),
('cat002', 'Dien Tu'),
('cat003', 'Giai dung'),
('cat004', 'Thuc Pham'),
('cat005', 'Noi That');

INSERT INTO products
VALUES('p001','Ao so mi', 2000, 20, 'Viet Tien', '2026-07-11','cat001'),
('p002','Bep dien', 10000, 15, 'Borch', '2026-07-12','cat001'),
('p003','May Giat', 20000, 30, 'Panasonic', '2026-05-11','cat003'),
('p004','Mi tom', 500, 100, 'Hao Hao', '2026-12-12','cat004'),
('p005','Tu quan ao', 80000, 22, 'LG', '2026-03-1','cat005');

-- Truy van du lieu ko co dieu kien
SELECT p.pro_name AS 'Ten san pham', p.pro_price AS 'Gia tien' -- cu phap Alias
FROM products AS p;

-- Truy van du lieu co dieu kien
SELECT p.pro_name AS 'Ten san pham', p.pro_price AS 'Gia tien' -- cu phap Alias
FROM products AS p
-- WHERE p.pro_price BETWEEN 2000 AND 20000;
-- WHERE NOT p.cat_id = 'cat001'; -- lay cac san pham co id khac cat 001
WHERE p.pro_name LIKE 'l%'; -- lay cac san pham co ten bat dau bang chu l

-- Gom nhom du lieu GROUP BY thuong di chung vs ham tong hop
SELECT p.pro_id AS 'Ma danh muc' -- cu phap Alias
FROM products AS p
GROUP BY p.cat_id;

-- Lay ra cua ten nhung danh muc co san pham
SELECT c.cat_name, COUNT(p.pro_id) AS 'So luong' 
FROM categories AS c
INNER JOIN products AS p
ON c.cat_id = p.cat_id
GROUP BY c.cat_name;
