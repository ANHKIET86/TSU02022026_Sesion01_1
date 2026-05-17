CREATE DATABASE ss06_exercises4;
USE ss06_exercises4;

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
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    price DECIMAL(15,2) NOT NULL CHECK(price > 0),

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
);

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
('od001', 'o001', 'Laptop Dell', 1, 15000000),
('od002', 'o001', 'Chuot Logitech', 2, 500000),
('od003', 'o002', 'Iphone 15', 1, 25000000),
('od004', 'o003', 'Ban phim co', 1, 2000000);

-- =========================================
-- 1. Them mot don hang moi
-- =========================================

INSERT INTO orders
VALUES
('o004', '2026-05-15', 'c003');

INSERT INTO order_details
VALUES
('od005', 'o004', 'Macbook Pro', 1, 30000000),
('od006', 'o004', 'Chuot Apple', 2, 2500000);

-- =========================================
-- 2. Tong doanh thu cua cua hang
-- =========================================

SELECT
    SUM(quantity * price) AS total_store_revenue
FROM order_details;

-- =========================================
-- 3. Doanh thu trung binh moi don hang
-- =========================================

SELECT
    AVG(order_total) AS average_order_revenue
FROM (
    SELECT
        order_id,
        SUM(quantity * price) AS order_total
    FROM order_details
    GROUP BY order_id
) AS order_revenue;

-- =========================================
-- 4. Don hang co doanh thu cao nhat
-- =========================================

SELECT
    o.order_id,
    o.order_date,
    SUM(od.quantity * od.price) AS total_revenue
FROM orders AS o
INNER JOIN order_details AS od
ON o.order_id = od.order_id
GROUP BY o.order_id, o.order_date
ORDER BY total_revenue DESC
LIMIT 1;

-- =========================================
-- 5. Top 3 san pham ban chay nhat
-- =========================================

SELECT
    product_name,
    SUM(quantity) AS total_sold
FROM order_details
GROUP BY product_name
ORDER BY total_sold DESC
LIMIT 3;