-- DROP DATABASE IF EXISTS snippetsDB;
-- CREATE DATABASE snippetsDB;
-- USE snippetsDB;


CREATE TABLE snippets (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    snippetTitle VARCHAR(100) NOT NULL,
    snippetBody VARCHAR(2000) NOT NULL,
    description VARCHAR(2000),
    language VARCHAR(100),
    createdDate DATETIME DEFAULT NOW(), -- NOW() can be replaced with CURRENT_TIMESTAMP --
    tagID INTEGER,
    PRIMARY KEY (id)
);

-- How to associate a snippet with multiple tags. --
CREATE TABLE tags (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    tagName VARCHAR(50),
    PRIMARY KEY (id)
);