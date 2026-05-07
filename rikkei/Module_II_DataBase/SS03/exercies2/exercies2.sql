CREATE TABLE books (
    book_id VARCHAR(20) PRIMARY KEY,
    book_name VARCHAR(100) NOT NULL
);
CREATE TABLE readers (
    reader_id VARCHAR(20) PRIMARY KEY,
    reader_name VARCHAR(100) NOT NULL
);
CREATE TABLE borrowings (
    reader_id VARCHAR(20),
    book_id VARCHAR(20),
    borrow_date DATE,
    return_date DATE,

    PRIMARY KEY (reader_id, book_id, borrow_date),

    FOREIGN KEY (reader_id) REFERENCES readers(reader_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);