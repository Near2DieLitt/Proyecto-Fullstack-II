CREATE TABLE metodo_pago (
    id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pago (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido          BIGINT NOT NULL,       
    id_metodo_pago     BIGINT NOT NULL,
    monto              DECIMAL(12,2) NOT NULL,
    estado             VARCHAR(20) NOT NULL,  
    codigo_transaccion VARCHAR(40) NOT NULL UNIQUE,
    fecha              DATETIME(6) NOT NULL,
    CONSTRAINT fk_pago_metodo FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id)
);
