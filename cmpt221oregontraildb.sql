create database if not exists oregontraildb;
set sql_safe_updates = 0;
use oregontraildb;



create table TopScores(
id int primary key auto_increment,
name varchar(30),
points int,
date datetime );

describe TopScores;

select * from topscores;

insert into topscores(name, points, date) values
('x', 10, CURRENT_TIME),
('x', 20, CURRENT_TIME),
('x', 30, CURRENT_TIME),
('x', 40, CURRENT_TIME),
('x', 50, CURRENT_TIME),
('x', 60, CURRENT_TIME),
('x', 70, CURRENT_TIME),
('x', 90, CURRENT_TIME),
('x', 100, CURRENT_TIME),
('x', 110, CURRENT_TIME),
('x', 120, CURRENT_TIME),
('x', 130, CURRENT_TIME);

delete from TopScores;

