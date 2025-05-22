CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    depositAddress VARCHAR(255),
    privateKey VARCHAR(255),
    balance VARCHAR(255),
)