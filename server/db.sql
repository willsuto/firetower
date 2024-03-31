CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  home_lat NUMERIC,
  home_long NUMERIC,
  home_location_set BOOLEAN,

  UNIQUE (username)
);