CREATE TABLE pedido (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     BIGINT NOT NULL,          
    id_direccion   BIGINT NOT NULL,          
    subtotal       DECIMAL(12,2) NOT NULL,
    costo_envio    DECIMAL(12,2) NOT NULL DEFAULT 0,
    total          DECIMAL(12,2) NOT NULL,
    estado         VARCHAR(20) NOT NULL DEFAULT 'CREADO',
    fecha_creacion DATETIME(6) NOT NULL
);

CREATE TABLE detalle_pedido (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido       BIGINT NOT NULL,
    id_producto     BIGINT NOT NULL,         
    nombre_producto VARCHAR(120) NOT NULL,   
    precio_unitario DECIMAL(10,2) NOT NULL,  
    cantidad        INT NOT NULL,
    subtotal        DECIMAL(12,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);
