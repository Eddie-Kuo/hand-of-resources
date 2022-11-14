-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pokemon;

DROP TABLE IF EXISTS dogs;

DROP TABLE IF EXISTS avengers;

DROP TABLE IF EXISTS shows;

DROP TABLE IF EXISTS countries;

CREATE TABLE countries (
    id bigint generated always AS identity PRIMARY KEY,
    name varchar,
    population_millions int NOT NULL,
    location varchar
);

INSERT INTO
    countries (name, population_millions, location)
VALUES
    ('taiwan', 24, 'asia'),
    ('canada', 38, 'north america'),
    ('france', 68, 'europe'),
    ('peru', 34, 'south america'),
    ('korea', 52, 'asia'),
    ('russia', 144, 'europe/asia');

CREATE TABLE pokemon (
    id bigint generated always AS IDENTITY PRIMARY KEY,
    name varchar,
    TYPE varchar
);

INSERT INTO
    pokemon (name, TYPE)
VALUES
    ('charmander', 'fire'),
    ('squirtle', 'water'),
    ('bulbasaur', 'grass'),
    ('jolteon', 'electric'),
    ('dratini', 'dragon');

CREATE TABLE dogs (
    id bigint generated always AS IDENTITY PRIMARY KEY,
    name varchar,
    breed varchar,
    age int NOT NULL
);

INSERT INTO
    dogs (name, breed, age)
VALUES
    ('brodie', 'corgi', 3),
    ('lexi', 'shiba', 3),
    ('galdolf', 'great dane', 2),
    ('savanna', 'labrador', 9),
    ('hughie', 'great dane', 5),
    ('harris', 'pitbull', 4);

CREATE TABLE avengers (
    id bigint generated always AS identity PRIMARY KEY,
    name varchar,
    rating int NOT NULL,
    weakness varchar
);

INSERT INTO
    avengers (name, rating, weakness)
VALUES
    ('ironman', 10, 'running out of battery'),
    ('captain america', 8, 'throwing shield too far'),
    ('hawkeye', 8, 'strong winds'),
    ('ant man', 7, 'bug traps'),
    ('hulk', 7, 'anyone who is stronger');

CREATE TABLE shows (
    id bigint generated always AS identity PRIMARY KEY,
    title varchar,
    episodes int NOT NULL,
    rating int NOT NULL
);

INSERT INTO
    shows (title, episodes, rating)
VALUES
    ('westworld', 36, 9),
    ('game of thrones', 76, 8),
    ('umbrella academy', 30, 9),
    ('altered carbon', 18, 7),
    ('obi wan kenobi', 6, 9),
    ('loki', 6, 8);