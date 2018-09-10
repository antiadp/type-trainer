insert into test_results (user_id, wpm, cpm, accuracy, efficiency, timestamp)
values ($1, $2, $3, $4, $5, $6);
select wpm, accuracy from test_results
where user_id = $1
order by efficiency desc limit 10;