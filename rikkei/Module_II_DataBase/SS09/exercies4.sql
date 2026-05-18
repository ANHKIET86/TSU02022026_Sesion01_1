DELIMITER //

CREATE PROCEDURE sp_check_order_value(
    IN p_total DECIMAL(15,2)
)
BEGIN
    IF p_total >= 5000000 THEN
        SELECT 'Don hang gia tri cao' AS message;
    ELSE
        SELECT 'Don hang binh thuong' AS message;
    END IF;
END //

DELIMITER ;

-- Goi procedure

CALL sp_check_order_value(7000000);

CALL sp_check_order_value(2000000);