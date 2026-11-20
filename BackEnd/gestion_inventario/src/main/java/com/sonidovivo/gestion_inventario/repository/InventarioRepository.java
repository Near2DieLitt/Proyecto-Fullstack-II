package com.sonidovivo.gestion_inventario.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sonidovivo.gestion_inventario.model.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    List<Inventario> findByIdProductoOrderByIdAsc(Long idProducto);

    Optional<Inventario> findByIdProductoAndBodegaId(Long idProducto, Long idBodega);

    @Query("SELECT i FROM Inventario i WHERE i.stockActual <= i.stockMinimo")
    List<Inventario> findBajoStock();
}
