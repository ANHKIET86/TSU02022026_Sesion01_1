CREATE DATABASE ss06_exercises5;
USE ss06_exercises5;

-- =========================================
-- Tao bang categories
-- =========================================

CREATE TABLE categories(
    cat_id CHAR(10) PRIMARY KEY,
    cat_name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================
-- Tao bang products
-- =========================================

CREATE TABLE products(
    product_id CHAR(10) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL CHECK(price > 0),
    quantity INT DEFAULT 0 CHECK(quantity >= 0),
    cat_id CHAR(10),

    FOREIGN KEY (cat_id)
    REFERENCES categories(cat_id)
);

-- =========================================
-- Tao bang customers
-- =========================================

CREATE TABLE customers(
    customer_id CHAR(10) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    customer_address VARCHAR(255)
);

-- =========================================
-- Tao bang orders
-- =========================================

CREATE TABLE orders(
    order_id CHAR(10) PRIMARY KEY,
    order_date DATE DEFAULT (CURRENT_DATE),
    customer_id CHAR(10),

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);

-- =========================================
-- Tao bang order_details
-- =========================================

CREATE TABLE order_details(
    order_detail_id CHAR(10) PRIMARY KEY,
    order_id CHAR(10),
    product_id CHAR(10),
    quantity INT NOT NULL CHECK(quantity > 0),
    price DECIMAL(15,2) NOT NULL CHECK(price > 0),

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
);

-- =========================================
-- Them du lieu categories
-- =========================================

INSERT INTO categories
VALUES
('cat001', 'Laptop'),
('cat002', 'Phone'),
('cat003', 'Accessory');

-- =========================================
-- Them du lieu products
-- =========================================

INSERT INTO products
VALUES
('p001', 'Macbook Pro', 30000000, 10, 'cat001'),
('p002', 'Dell XPS', 25000000, 5, 'cat001'),
('p003', 'Iphone 15', 27000000, 15, 'cat002'),
('p004', 'Samsung S25', 22000000, 8, 'cat002'),
('p005', 'Chuot Logitech', 500000, 30, 'cat003'),
('p006', 'Ban phim co', 2000000, 20, 'cat003');

-- =========================================
-- Them du lieu customers
-- =========================================

INSERT INTO customers
VALUES
('c001', 'Nguyen Van A', '0901234567', 'Ha Noi'),
('c002', 'Tran Thi B', '0912345678', 'Da Nang'),
('c003', 'Le Van C', '0923456789', 'TP HCM');

-- =========================================
-- Them du lieu orders
-- =========================================

INSERT INTO orders
VALUES
('o001', '2026-05-11', 'c001'),
('o002', '2026-05-12', 'c002'),
('o003', '2026-05-13', 'c001');

-- =========================================
-- Them du lieu order_details
-- =========================================

INSERT INTO order_details
VALUES
('od001', 'o001', 'p001', 1, 30000000),
('od002', 'o001', 'p005', 2, 500000),
('od003', 'o002', 'p003', 1, 27000000),
('od004', 'o003', 'p006', 1, 2000000);

-- =========================================
-- 1. Liet ke san pham kem ten danh muc
-- =========================================

SELECT
    p.product_id,
    p.product_name,
    c.cat_name
FROM products AS p
INNER JOIN categories AS c
ON p.cat_id = c.cat_id;

-- =========================================
-- 2. Dem so don hang cua tung khach hang
-- =========================================

SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS total_orders
FROM customers AS c
LEFT JOIN orders AS o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;

-- =========================================
-- 3. Tim 5 khach hang chi tieu cao nhat
-- =========================================

SELECT
    c.customer_id,
    c.customer_name,
    SUM(od.quantity * od.price) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id
INNER JOIN order_details AS od
ON o.order_id = od.order_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spending DESC
LIMIT 5;

-- =========================================
-- 4. Tim san pham chua tung duoc ban
-- =========================================

SELECT
    p.product_id,
    p.product_name
FROM products AS p
LEFT JOIN order_details AS od
ON p.product_id = od.product_id
WHERE od.product_id IS NULL;

-- =========================================
-- 5. Tim khach hang da mua san pham
-- thuoc danh muc co nhieu san pham nhat
-- =========================================

SELECT DISTINCT
    c.customer_id,
    c.customer_name
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id
INNER JOIN order_details AS od
ON o.order_id = od.order_id
INNER JOIN products AS p
ON od.product_id = p.product_id
WHERE p.cat_id = (
    SELECT cat_id
    FROM productscategories
    GROUP BY cat_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);