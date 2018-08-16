select u.username, u.user_id, u.img, t.test_id, t.wpm, t.cpm, t.accuracy, t.efficiency, t.timestamp
from test_results t, users u
where t.user_id = u.user_id;