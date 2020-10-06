INSERT INTO schedule (users_id, week_day, shift_time)
VALUES ($1, $2, $3)
returning *;