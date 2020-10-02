SELECT p.id, u.first_name, u.last_name, u.email, p.users_id AS author_id, p.content AS post_content, p.created_at AS post_created_at, c.content c.created_at
FROM comments c
JOIN users u ON c.users_id = u.id
JOIN posts p ON c.post_id = p.id;