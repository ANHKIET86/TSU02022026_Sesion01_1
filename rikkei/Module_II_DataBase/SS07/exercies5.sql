CREATE TABLE scores (
    student_id VARCHAR(10),
    subject VARCHAR(100),
    score DECIMAL(4,2)
);

INSERT INTO scores (student_id, subject, score)
VALUES
('SV001', 'Math', 8.5),
('SV001', 'English', 7.5),
('SV001', 'Physics', 9.0),

('SV002', 'Math', 6.0),
('SV002', 'English', 6.5),
('SV002', 'Physics', 7.0),

('SV003', 'Math', 9.5),
('SV003', 'English', 9.0),
('SV003', 'Physics', 8.5),

('SV004', 'Math', 5.5),
('SV004', 'English', 6.0),
('SV004', 'Physics', 5.0);

SELECT student_id,
       AVG(score) AS avg_score
FROM scores
GROUP BY student_id;

SELECT student_id,
       AVG(score) AS avg_score
FROM scores
GROUP BY student_id
HAVING AVG(score) >= 7.0;

SELECT student_id,
       AVG(score) AS avg_score
FROM scores
GROUP BY student_id
HAVING AVG(score) = (
    SELECT MAX(avg_score)
    FROM (
        SELECT AVG(score) AS avg_score
        FROM scores
        GROUP BY student_id
    ) AS temp
);

SELECT student_id,
       AVG(score) AS avg_score
FROM scores
GROUP BY student_id
HAVING AVG(score) > (
    SELECT AVG(score)
    FROM scores
);