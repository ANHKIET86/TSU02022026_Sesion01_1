CREATE TABLE employees (
    emp_id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(12,2) NOT NULL
);

INSERT INTO employees (emp_id, full_name, department, salary)
VALUES
('E001', 'Nguyen Van A', 'IT', 15000000),
('E002', 'Tran Thi B', 'IT', 13000000),
('E003', 'Le Van C', 'IT', 14000000),
('E004', 'Pham Thi D', 'IT', 16000000),
('E005', 'Hoang Van E', 'HR', 10000000),
('E006', 'Nguyen Thi F', 'HR', 11000000),
('E007', 'Tran Van G', 'HR', 12500000),
('E008', 'Le Thi H', 'Marketing', 9000000),
('E009', 'Pham Van I', 'Marketing', 9500000),
('E010', 'Do Thi K', 'Sales', 17000000);

SELECT department,
       COUNT(emp_id) AS total_employees
FROM employees
GROUP BY department;

SELECT department,
       AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

SELECT department,
       COUNT(emp_id) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(emp_id) > 3;

SELECT department,
       AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 12000000;