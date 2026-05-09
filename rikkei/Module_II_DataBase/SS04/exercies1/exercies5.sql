CREATE TABLE employees (
    emp_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_year INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    phone VARCHAR(20)
);

INSERT INTO employees (emp_id, full_name, birth_year, department, salary, phone)
VALUES
('E001', 'Nguyen Anh Kiet', 1999, 'IT', 15000000, '0901234567'),
('E002', 'Tran Van Nam', 1998, 'HR', 12000000, NULL),
('E003', 'Le Thi Anh', 2000, 'Marketing', 9000000, '0912345678'),
('E004', 'Pham Van B', 1997, 'IT', 18000000, NULL),
('E005', 'Hoang Thi C', 1995, 'HR', 11000000, '0934567891'),
('E006', 'Nguyen Minh Anh', 1996, 'Sales', 20000000, '0945678912'),
('E007', 'Do Van D', 1994, 'IT', 4500000, NULL),
('E008', 'Tran Thi E', 2001, 'Accounting', 8000000, '0956789123'),
('E009', 'Nguyen Anh Tuan', 1993, 'HR', 17000000, NULL),
('E010', 'Le Van F', 1998, 'IT', 25000000, '0967891234');

SELECT * FROM employees
WHERE salary BETWEEN 10000000 AND 20000000;

SELECT * FROM employees
WHERE department IN ('IT', 'HR');

SELECT * FROM employees
WHERE full_name LIKE '%Anh%';

SELECT * FROM employees
WHERE phone IS NULL;

UPDATE employees
SET salary = salary * 1.10
WHERE department = 'IT';
SELECT * FROM employees;

UPDATE employees
SET phone = '0999999999'
WHERE phone IS NULL;
SELECT * FROM employees;

DELETE FROM employees
WHERE salary < 5000000;
SELECT * FROM employees;