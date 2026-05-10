CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_year INT NOT NULL,
    gender VARCHAR(10),
    score DECIMAL(4,2)
);

INSERT INTO students (student_id, full_name, birth_year, gender, score)
VALUES
('SV001', 'Nguyen Van A', 2003, 'Male', 8.25),
('SV002', 'Tran Thi B', 2002, 'Female', 7.50),
('SV003', 'Le Van C', 2001, 'Male', 9.10),
('SV004', 'Pham Thi D', 2004, 'Female', 6.75),
('SV005', 'Hoang Van E', 2003, 'Male', 8.80);

SELECT student_id, UPPER(full_name) AS full_name_upper
FROM students;

SELECT full_name,
       YEAR(CURDATE()) - birth_year AS age
FROM students;

SELECT full_name,
       ROUND(score, 1) AS rounded_score
FROM students;

SELECT COUNT(student_id) AS total_students,
       MAX(score) AS highest_score,
       MIN(score) AS lowest_score
FROM students;