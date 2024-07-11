CREATE SCHEMA organisations;

CREATE TABLE organisations.organisations (
    orgId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50)
);