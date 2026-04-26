CREATE TABLE class_management.classes(
	class_id VARCHAR(20) PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    school_year VARCHAR(20) NOT NULL
);

CREATE TABLE student_management.students (
    student_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    gender VARCHAR(10),
    class_id VARCHAR(20),
    FOREIGN KEY(class_id) REFERENCES classes(class_id)
);