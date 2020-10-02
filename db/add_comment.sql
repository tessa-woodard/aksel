INSERT INTO "comments" (users_id, post_id, content, created_at)
VALUES ($1, $2, $3, NOW())
returning *;