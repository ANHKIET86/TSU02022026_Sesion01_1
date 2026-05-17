CREATE VIEW v_order_info AS
SELECT
    o.order_id,
    o.order_date,
    c.customer_name
FROM orders AS o
INNER JOIN customers AS c
ON o.customer_id = c.customer_id;