
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(200) NOT NULL,
    fecha_registro TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_role (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios (id_usuario),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE IF NOT EXISTS moods (
    id SERIAL PRIMARY KEY,
    mood_type VARCHAR(50) NOT NULL,
    stress_level INTEGER,
    energy_level INTEGER,
    note TEXT,
    date DATE NOT NULL,
    id_usuario BIGINT NOT NULL,

    CONSTRAINT fk_mood_user
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);