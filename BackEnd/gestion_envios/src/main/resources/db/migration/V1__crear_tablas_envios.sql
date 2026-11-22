CREATE TABLE envio (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido          BIGINT NOT NULL UNIQUE,   
    id_direccion       BIGINT NOT NULL,          
    empresa            VARCHAR(60) NOT NULL,
    codigo_seguimiento VARCHAR(40) NOT NULL UNIQUE,
    estado             VARCHAR(20) NOT NULL,     
    fecha_estimada     DATE,
    fecha_creacion     DATETIME(6) NOT NULL
);

CREATE TABLE historial_envio (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_envio BIGINT NOT NULL,
    estado   VARCHAR(20) NOT NULL,
    detalle  VARCHAR(200),
    fecha    DATETIME(6) NOT NULL,
    CONSTRAINT fk_hist_envio FOREIGN KEY (id_envio) REFERENCES envio(id)
);
