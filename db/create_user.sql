insert into User (username, password, img)
values ($1, $2, $3)
returning*;


-- This needs to be tested on the database!