CREATE TABLE customers (
    customer_id VARCHAR(10) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    order_id VARCHAR(10) PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id VARCHAR(10),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id VARCHAR(10),
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO customers (customer_id, customer_name)
VALUES
('C001', 'Nguyen Van A'),
('C002', 'Tran Thi B');

INSERT INTO orders (order_id, order_date, customer_id)
VALUES
('O001', '2026-05-01', 'C001'),
('O002', '2026-05-02', 'C002');

INSERT INTO order_items (order_id, product_name, quantity, price)
VALUES
('O001', 'MacBook Air M2', 1, 25000000),
('O001', 'Mouse Logitech', 2, 500000),
('O002', 'Samsung Galaxy S24', 1, 18000000),
('O002', 'Keyboard AKKO', 1, 2000000);

SELECT o.order_id,
       o.order_date,
       c.customer_name
FROM orders o
JOIN customers c
ON o.customer_id = c.customer_id;

SELECT o.order_id,
       oi.product_name,
       oi.quantity,
       oi.price
FROM orders o
JOIN order_items oi
ON o.order_id = oi.order_id;

SELECT o.order_id,
       SUM(oi.quantity * oi.price) AS total_amount
FROM orders o
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY o.order_id;

SELECT o.order_id,
       SUM(oi.quantity * oi.price) AS total_amount
FROM orders o
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY o.order_id
HAVING SUM(oi.quantity * oi.price) > 10000000;