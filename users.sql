CREATE TABLE users(
  id serial PRIMARY KEY,
  "firstName" varchar(128),
  "lastName" varchar(128),
  "email" text,
  "password" varchar(256),
  "isMale" boolean,
  birthday date,
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL,
);