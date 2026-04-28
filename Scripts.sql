
-- 1. Crear la base de datos (si no existe)
CREATE DATABASE cli_crud;
USE cli_crud;

-- 2. Crear la tabla de usuarios
CREATE TABLE users (
    id VARCHAR(40) PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE ,
    password VARCHAR(40) NOT NULL 
);