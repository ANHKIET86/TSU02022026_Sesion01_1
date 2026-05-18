DELIMITER //

CREATE PROCEDURE sp_get_products_by_category(
    IN p_category VARCHAR(100)
)
BEGIN
    SELECT *
    FROM products
    WHERE category = p_category;
END //

DELIMITER ;
CALL sp_get_products_by_category('Dien Tu');