CREATE TABLE user_management.users (
    user_id VARCHAR(20) PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE,
    password VARCHAR(50) NOT NULL,
    status VARCHAR(10) default 'active',
    CHECK (status IN ('active', 'inactive'))
);