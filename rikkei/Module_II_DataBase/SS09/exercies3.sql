DELIMITER //

CREATE PROCEDURE sp_get_avg_salary()
BEGIN
    -- Khai bao bien
    DECLARE avg_salary DECIMAL(15,2);

    -- Gan gia tri cho bien
    SELECT AVG(salary)
    INTO avg_salary
    FROM employees;

    -- Hien thi gia tri cua bien
    SELECT avg_salary AS average_salary;
END //

DELIMITER ;

-- Goi procedure

CALL sp_get_avg_salary();