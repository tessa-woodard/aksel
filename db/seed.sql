DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(300),
    password TEXT,
    first_name TEXT,
    last_name TEXT,
    profile_picture TEXT,
    is_manager BOOLEAN DEFAULT false
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    users_id INT REFERENCES users(id),
    content VARCHAR(500),
    created_at DATE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    users_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    content VARCHAR(500),
    created_at DATE
);

CREATE TABLE schedule (
    shift_id SERIAL PRIMARY KEY,
    users_id INT REFERENCES users(id),
    week_day VARCHAR(10),
    shift_time VARCHAR(30)
);