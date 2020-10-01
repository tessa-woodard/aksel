INSERT INTO users (first_name, last_name, email, password, profile_picture)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, first_name, last_name, email;