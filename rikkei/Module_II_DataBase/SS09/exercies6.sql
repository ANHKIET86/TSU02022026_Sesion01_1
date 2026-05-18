DELIMITER //

CREATE PROCEDURE sp_classify_student(
    IN p_score DECIMAL(3,1),
    OUT p_classification VARCHAR(50)
)
BEGIN
    -- Khai bao bien trung gian
    DECLARE v_result VARCHAR(50);

    -- Su dung CASE de xep loai
    SET v_result = CASE
        WHEN p_score >= 8.0 THEN 'Gioi'
        WHEN p_score >= 6.5 THEN 'Kha'
        WHEN p_score >= 5.0 THEN 'Trung binh'
        ELSE 'Yeu'
    END;

    -- Gan ket qua cho tham so OUT
    SET p_classification = v_result;
END //

DELIMITER ;

-- Goi procedure de kiem tra

CALL sp_classify_student(8.5, @result);

SELECT @result AS classification;