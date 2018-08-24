-- select * from snippets
-- where id = 21;
select * from snippets
where snippet_language = $1
order by id asc;