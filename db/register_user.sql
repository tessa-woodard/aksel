INSERT INTO users (first_name, last_name, email, password, profile_picture, is_manager)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, first_name, last_name, email, is_manager;