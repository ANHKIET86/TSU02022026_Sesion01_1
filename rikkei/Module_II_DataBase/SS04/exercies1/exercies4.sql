CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
    email VARCHAR(100) UNIQUE
);

INSERT INTO students (student_id, full_name, birth_date, gender, email) 
VALUES
('SV001', 'Nguyen Van A', '2003-01-01', 'Male', 'nguenvana@gmail.com'),
('SV002', 'Nguyen Van B', '1996-06-29', 'Male', NULL),
('SV003', 'Nguyen Thi C', '1995-12-23', 'Female', NULL),
('SV004', 'Nguyen Thi D', '1999-05-06', 'Female', 'nguenthid@gmail.com'),
('SV005', 'Nguyen Van E', '2003-04-01', 'Male', 'nguenvane@gmail.com');

SELECT * FROM students
WHERE email IS NULL;

SELECT * FROM students
WHERE email IS NOT NULL;

SELECT * FROM students
WHERE full_name like 'Ng%';

SELECT * FROM students
WHERE NOT gender = 'Male';