SELECT u.id, u.first_name, u.last_name, s.week_day, s.shift_time, s.shift_id
FROM schedule s
JOIN users u ON s.users_id = u.id;