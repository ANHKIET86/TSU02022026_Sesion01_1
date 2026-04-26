CREATE TABLE orthers (
	order_id VARCHAR(20) PRIMARY KEY,
    order_date DATE NOT NULL
);

CREATE TABLE products (
    product_id VARCHAR(20) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE products (
	order_id VARCHAR(20),
	product_id VARCHAR(20),
    quantity INT NOT NULL,
    
    PRIMARY KEY (order_id, product_id),
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);