CREATE TABLE historial_estado_pedido (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    estado    VARCHAR(20) NOT NULL,
    fecha     DATETIME(6) NOT NULL,
    CONSTRAINT fk_hist_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);
