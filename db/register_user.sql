INSERT INTO users (email, password, first_name, last_name, profile_picture)

VALUES ($1, $2, $3, $4, $5)

RETURNING id, first_name;