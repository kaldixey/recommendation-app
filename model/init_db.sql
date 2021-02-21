DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100),
    country VARCHAR(100)
);


CREATE TABLE items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    media_type VARCHAR(100),
    title VARCHAR(100) NOT NULL,
    genres VARCHAR(200),
    overview TEXT,
    release_date DATE,
    item_length INT,
    api_id INT,
    userid INT
);
