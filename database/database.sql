CREATE DATABASE ayds_proyect_usm
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\l

\c ayds_proyect_usm

CREATE TABLE IF NOT EXISTS public.administracion (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.profesor (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.alumnos (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    profesor_id INT,
    CONSTRAINT fk_profesor FOREIGN KEY (profesor_id) REFERENCES profesor(id)
);

CREATE TABLE IF NOT EXISTS public.clases (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    alumno_id INT,
    foo text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMM'),
    CONSTRAINT fk_profesor FOREIGN KEY (profesor_id) REFERENCES profesor(id)
);

CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.links (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(200) NOT NULL,
    url VARCHAR(200) NOT NULL,
    description TEXT,
    user_id INT,
    foo text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMM'),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO public.users(name, password, email)
VALUES ('admin', 'usm-charapter', 'admin@usm.cl');

