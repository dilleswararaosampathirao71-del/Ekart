CREATE DATABASE ecart;

USE ecart;

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    quantity INT,
    image TEXT
);