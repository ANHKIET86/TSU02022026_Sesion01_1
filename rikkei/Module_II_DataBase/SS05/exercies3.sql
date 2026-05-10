CREATE TABLE products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL
);

INSERT INTO products (product_id, product_name, category, price)
VALUES
('P001', 'MacBook Air M2', 'Laptop', 25000000),
('P002', 'Dell Inspiron', 'Laptop', 18000000),
('P003', 'iPhone 15', 'Phone', 22000000),
('P004', 'Samsung Galaxy S24', 'Phone', 19000000),
('P005', 'iPad Pro', 'Tablet', 21000000),
('P006', 'Xiaomi Pad 6', 'Tablet', 12000000);

SELECT *
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);

SELECT *
FROM products p1
WHERE price = (
    SELECT MAX(price)
    FROM products p2
    WHERE p1.category = p2.category
);

SELECT *
FROM products
WHERE category IN (
    SELECT DISTINCT category
    FROM products
    WHERE price > 20000000
);