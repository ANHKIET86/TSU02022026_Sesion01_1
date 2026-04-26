CREATE TABLE product_management.products (
    product_id VARCHAR(20) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    stock INT NOT NULL
);