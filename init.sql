CREATE DATABASE IF NOT EXISTS danube_levels;
USE danube_levels;

CREATE TABLE IF NOT EXISTS water_levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    station VARCHAR(255),
    level INT,
    date DATE,
    time TIME
);
