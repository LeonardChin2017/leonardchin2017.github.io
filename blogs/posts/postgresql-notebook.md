---
title: "Exploring PostgreSQL: My Learning Notebook"
date: Dec 27, 2021
summary: "My personal notes on PostgreSQL covering setup, a comprehensive list of SQL keywords and examples, comparison of PostgreSQL vs MySQL, and the differences between NoSQL and RDBMS."
---

This blog post serves as my personal notes on what I have learned about PostgreSQL, covering setup, SQL keywords, and a comparison with MySQL and NoSQL.

## RDBMS and NoSQL: Understanding Their Differences

NoSQL databases excel in scalability, making them suitable for handling large numbers of read-write operations with minimal latency. They offer flexibility in data modeling and prioritize eventual consistency, which is advantageous when immediate consistency is not critical.

SQL-based RDBMS still possesses strengths such as a strong mathematical basis, declarative syntax, and the well-known Structured Query Language (SQL). **NoSQL is not intended to replace SQL** but rather to provide an alternative for non-relational data scenarios.

In this blog, we will focus on RDBMS. Examples include PostgreSQL, MySQL, and SQLite.

## PostgreSQL vs. MySQL: Which Is Better?

- **PostgreSQL** — recommended for applications that may scale to enterprise level, involve complex queries, and require frequent write operations.
- **MySQL** — a good choice if you are new to databases, don't anticipate significant scaling, or need a quick prototyping tool.

## Setup PostgreSQL

- Download and install PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- Download and install pgAdmin 4: [https://www.pgadmin.org/download/pgadmin-4-windows/](https://www.pgadmin.org/download/pgadmin-4-windows/)

## SQL Keywords & Examples

| Keyword | Example | Description |
|---|---|---|
| SELECT | `SELECT * FROM tbl` | Select all rows and columns from table `tbl` |
| SELECT | `SELECT c1,c2 FROM tbl` | Select specific columns |
| SELECT | `SELECT c1,c2 FROM tbl WHERE conditions ORDER BY c1 ASC, c2 DESC` | Filter and sort results |
| SELECT | `SELECT DISTINCT c1,c2 FROM tbl` | Select distinct rows |
| SELECT | `SELECT c1, aggregate(expr) FROM tbl GROUP BY c1` | Group and aggregate |
| SELECT | `SELECT c1, aggregate(expr) AS c2 FROM tbl GROUP BY c1 HAVING c2 > v` | Filter grouped results |
| INSERT INTO | `INSERT INTO tbl (c1, c2) VALUES (v1, v2)` | Insert data into a table |
| INSERT INTO | `INSERT INTO tbl (c1, c2) SELECT c1, c2 FROM tb2 WHERE conditions` | Insert from another table |
| UPDATE | `UPDATE tbl SET c1 = v1, c2 = v2 WHERE conditions` | Update data |
| DELETE | `DELETE FROM tbl WHERE conditions` | Delete records by condition |
| TRUNCATE | `TRUNCATE TABLE tbl` | Drop and re-create table, all data is lost |
| INNER JOIN | `SELECT * FROM tb1 INNER JOIN tb2 ON join-conditions` | Inner join two tables |
| LEFT JOIN | `SELECT * FROM tb1 LEFT JOIN tb2 ON join-conditions` | Left join two tables |
| RIGHT JOIN | `SELECT * FROM tb1 RIGHT JOIN tb2 ON join-conditions` | Right join two tables |
| CREATE TABLE | `CREATE TABLE tbl (c1 datatype(length) PRIMARY KEY)` | Create a new table |
| DROP TABLE | `DROP TABLE tbl` | Remove a table from the database |
| ALTER TABLE | `ALTER TABLE tbl ADD COLUMN c1 datatype(length)` | Add a column |
| ALTER TABLE | `ALTER TABLE tbl DROP COLUMN c1` | Drop a column |
