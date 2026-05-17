CREATE DATABASE ss06_exercises2;
USE ss06_exercises2;

-- Tao bang customers
CREATE TABLE customers(
    customer_id CHAR(10) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    customer_address VARCHAR(255)
);

-- Tao bang orders
CREATE TABLE orders(
    order_id CHAR(10) PRIMARY KEY,
    order_date DATE DEFAULT (CURRENT_DATE),
    customer_id CHAR(10),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Tao bang order_details
CREATE TABLE order_details(
    order_detail_id CHAR(10) PRIMARY KEY,
    order_id CHAR(10),
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    price DECIMAL(15,2) NOT NULL CHECK(price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Them du lieu vao customers
INSERT INTO customers
VALUES
('c001', 'Nguyen Van A', '0901234567', 'Ha Noi'),
('c002', 'Tran Thi B', '0912345678', 'Da Nang'),
('c003', 'Le Van C', '0923456789', 'TP HCM');

-- Them 2 khach hang moi
INSERT INTO customers
VALUES
('c004', 'Pham Van D', '0934567890', 'Hai Phong'),
('c005', 'Hoang Thi E', '0945678901', 'Can Tho');

-- Them du lieu vao orders
INSERT INTO orders
VALUES
('o001', '2026-05-11', 'c001'),
('o002', '2026-05-12', 'c002'),
('o003', '2026-05-13', 'c001');

-- Them du lieu vao order_details
INSERT INTO order_details
VALUES
('od001', 'o001', 'Laptop Dell', 1, 15000000),
('od002', 'o001', 'Chuot Logitech', 2, 500000),
('od003', 'o002', 'Iphone 15', 1, 25000000),
('od004', 'o003', 'Ban phim co', 1, 2000000);

-- Liet ke khach hang da co it nhat 1 don hang
SELECT DISTINCT c.customer_id,
                c.customer_name
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id;

-- Tim khach hang chua tung dat don hang
SELECT c.customer_id,
       c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Tinh tong doanh thu moi khach hang
SELECT c.customer_id,
       c.customer_name,
       SUM(od.quantity * od.price) AS total_revenue
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id
INNER JOIN order_details AS od
ON o.order_id = od.order_id
GROUP BY c.customer_id, c.customer_name;

-- Tim khach hang da mua san pham co gia cao nhat
SELECT DISTINCT c.customer_id,
                c.customer_name,
                od.product_name,
                od.price
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id
INNER JOIN order_details AS od
ON o.order_id = od.order_id
WHERE od.price = (
    SELECT MAX(price)
    FROM order_details
);