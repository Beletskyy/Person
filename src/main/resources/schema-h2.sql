DROP TABLE IF EXISTS USER;

CREATE TABLE USER (
  ID BIGINT IDENTITY NOT NULL PRIMARY KEY,
  NAME VARCHAR(64) NOT NULL,
  PHONE VARCHAR(64) NOT NULL,
  GENDER VARCHAR(64) NOT NULL,
  DEPARTMENT VARCHAR(100) NOT NULL
);