DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS schedule;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(300),
    password text,
    first_name text,
    last_name text,
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