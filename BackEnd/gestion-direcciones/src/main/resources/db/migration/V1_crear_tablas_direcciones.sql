CREATE TABLE region (
    id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE comuna (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL,
    id_region BIGINT NOT NULL,
    CONSTRAINT fk_comuna_region FOREIGN KEY (id_region) REFERENCES region(id)
);

CREATE TABLE direccion (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,          -- sin FK: el usuario vive en db_usuarios
    calle      VARCHAR(150) NOT NULL,
    numero     VARCHAR(20)  NOT NULL,
    depto      VARCHAR(20),
    referencia VARCHAR(200),
    id_comuna  BIGINT NOT NULL,
    principal  BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_direccion_comuna FOREIGN KEY (id_comuna) REFERENCES comuna(id)
);
