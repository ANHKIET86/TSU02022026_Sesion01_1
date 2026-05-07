CREATE DATABASE ss03_exercies3;
USE ss03_exercies3;

CREATE TABLE products (
    pro_id INT PRIMARY KEY,
    pro_name VARCHAR(150) NOT NULL,
    pro_price DECIMAL(10,2) NOT NULL CHECK (pro_price >= 0),  -- 10 là tổng chữ số, 2 là số sau dấu phẩy
    pro_stock INT DEFAULT 1
);

CREATE TABLE orders (
    or_id INT PRIMARY KEY AUTO_INCREMENT,
    or_total DECIMAL(10, 2) NOT NULL,
    or_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    pro_id INT,
    FOREIGN KEY (pro_id) REFERENCES products(pro_id)
);