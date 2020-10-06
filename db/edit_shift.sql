UPDATE schedule
SET shift_time = $1
WHERE shift_id = $2
returning *;