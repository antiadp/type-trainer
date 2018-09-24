insert into test_results (user_id, wpm, cpm, accuracy, efficiency, timestamp)
values ($1, $2, $3, $4, $5, $6)
returning*;