-- CREATE TABLE users (
--   user_id SERIAL PRIMARY KEY,
--   username VARCHAR(50) NOT NULL,
--   password VARCHAR(100) NOT NULL,
--   home_lat NUMERIC,
--   home_long NUMERIC,
--   home_location_set BOOLEAN,
--   UNIQUE (username)
-- );

-- CREATE TABLE fires (
--   fire_id SERIAL PRIMARY KEY,
--   latitude NUMERIC NOT NULL,
--   longitude NUMERIC NOT NULL,
--   bright_ti4 NUMERIC,
--   scan NUMERIC,
--   track NUMERIC,
--   acq_date VARCHAR,
--   acq_time VARCHAR,
--   satellite VARCHAR,
--   instrument VARCHAR,
--   confidence VARCHAR,
--   version VARCHAR,
--   bright_ti5 NUMERIC,
--   frp NUMERIC,
--   daynight VARCHAR
-- );

CREATE TABLE fires (
    latitude FLOAT,
    longitude FLOAT,
    bright_ti4 FLOAT,
    scan FLOAT,
    track FLOAT,
    acq_date DATE,
    acq_time INTEGER,
    satellite VARCHAR(10),
    instrument VARCHAR(10),
    confidence CHAR(1),
    version VARCHAR(10),
    bright_ti5 FLOAT,
    frp FLOAT,
    daynight CHAR(1),
    UNIQUE (latitude, longitude)
);
