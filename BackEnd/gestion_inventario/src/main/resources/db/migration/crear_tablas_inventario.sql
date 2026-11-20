CREATE TABLE bodega (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre    VARCHAR(80) NOT NULL UNIQUE,
    ubicacion VARCHAR(150)
);

CREATE TABLE inventario (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_producto  BIGINT NOT NULL,       -- sin FK: el producto vive en db_catalogo
    id_bodega    BIGINT NOT NULL,
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 2,
    CONSTRAINT uq_producto_bodega UNIQUE (id_producto, id_bodega),
    CONSTRAINT fk_inventario_bodega FOREIGN KEY (id_bodega) REFERENCES bodega(id)
);

CREATE TABLE movimiento_inventario (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_inventario BIGINT NOT NULL,
    tipo          VARCHAR(10) NOT NULL,   -- ENTRADA | SALIDA
    cantidad      INT NOT NULL,
    motivo        VARCHAR(150),
    id_pedido     BIGINT NULL,            -- si fue por una compra
    fecha         DATETIME(6) NOT NULL,
    CONSTRAINT fk_mov_inventario FOREIGN KEY (id_inventario) REFERENCES inventario(id)
);
