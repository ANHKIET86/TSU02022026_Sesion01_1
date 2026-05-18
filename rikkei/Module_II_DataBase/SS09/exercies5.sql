DELIMITER //

CREATE PROCEDURE sp_check_employee_income(
    IN p_full_name VARCHAR(100),
    IN p_salary DECIMAL(15,2)
)
BEGIN
    IF p_salary >= 15000000 THEN
        SELECT 
            p_full_name AS employee_name,
            'Thu nhap cao' AS income_level;

    ELSEIF p_salary >= 8000000 THEN
        SELECT 
            p_full_name AS employee_name,
            'Thu nhap trung binh' AS income_level;

    ELSE
        SELECT 
            p_full_name AS employee_name,
            'Thu nhap thap' AS income_level;
    END IF;
END //

DELIMITER ;

-- Goi procedure

CALL sp_check_employee_income('Nguyen Van A', 18000000);

CALL sp_check_employee_income('Tran Thi B', 10000000);

CALL sp_check_employee_income('Le Van C', 5000000);