SELECT c.id, u.first_name, u.last_name, u.email, c.users_id AS author_id, c.content, c.created_at 
FROM comments c
JOIN users u ON c.users_id = u.id
WHERE c.post_id = $1
ORDER BY c.id;
