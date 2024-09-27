CREATE DATABASE feeforum;
USE feeforum;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY;
    username TEXT(20) NOT NULL,
    useremail VARCHAR(30) NOT NULL UNIQUE,
    usercontact VARCHAR(15) NOT NULL UNIQUE,
    userregno VARCHAR(8) NOT NULL UNIQUE,
    usergender TEXT(8) NOT NULL,
    userpassword VARCHAR(1000) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    payerregno VARCHAR(8) NOT NULL,
    amountpaid DECIMAL(10,2) NOT NULL,
    datepaid DATE NOT NULL,
    recordcreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username TEXT(30) NOT NULL,
    useremail VARCHAR(50) NOT NULL UNIQUE,
    usercontact VARCHAR(15) NOT NULL UNIQUE,
    class VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )