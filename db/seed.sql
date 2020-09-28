DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS schedule;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(20),
    password VARCHAR(20),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    profile_picture text
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT,
    post_id INT
);

CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    user_id INT,
    start_time INT,
    end_time INT
);