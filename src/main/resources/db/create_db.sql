-- Script para crear la base de datos minervamind
CREATE DATABASE minervamind
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8'
    TEMPLATE = template0;

-- Comentario
COMMENT ON DATABASE minervamind IS 'Base de datos para Minerva Mind API';
