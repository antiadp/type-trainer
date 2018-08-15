insert into users (username, password, img)
values ($1, $2, $3)
returning id, username, img;


-- Tested with postman by ak