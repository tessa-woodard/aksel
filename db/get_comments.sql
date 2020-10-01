SELECT p.id, u.first_name, u.last_name, u.email, p.users_id AS author_id, p.content, p.created_at 
FROM posts p
JOIN users u ON p.users_id = u.id;