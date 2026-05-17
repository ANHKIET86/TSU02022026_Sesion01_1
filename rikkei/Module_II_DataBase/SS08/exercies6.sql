CREATE INDEX idx_search_status_orderdate
ON orders(order_status, order_date);