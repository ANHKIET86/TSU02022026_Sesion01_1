CREATE TABLE products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO products (product_id, product_name, category, price, quantity)
VALUES
('P001', 'Samsung Galaxy S24', 'Phone', 14000000, 10),
('P002', 'Samsung Tab S9', 'Tablet', 12000000, 5),
('P003', 'Dell Inspiron 15', 'Laptop', 15000000, 8),
('P004', 'MacBook Air M2', 'Laptop', 25000000, 3),
('P005', 'iPad Air', 'Tablet', 16000000, 0);

SELECT * FROM products
WHERE price BETWEEN 5000000 AND 15000000;

SELECT * FROM products
WHERE category IN ('Tablet', 'Laptop');

SELECT * FROM products
WHERE product_name LIKE 'Sam%';

SELECT * FROM products
WHERE NOT category LIKE 'Phone';

UPDATE products
SET price = price * 0.95
WHERE category = 'Laptop'
LIMIT 10;
SELECT * FROM products;

DELETE FROM products
WHERE quantity = 0
LIMIT 10;
SELECT * FROM products;