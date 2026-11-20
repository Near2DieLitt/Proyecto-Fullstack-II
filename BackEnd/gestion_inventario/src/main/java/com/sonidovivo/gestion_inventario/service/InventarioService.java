package com.sonidovivo.gestion_inventario.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonidovivo.gestion_inventario.client.CatalogoClient;
import com.sonidovivo.gestion_inventario.dto.InventarioRequestDTO;
import com.sonidovivo.gestion_inventario.dto.MovimientoRequestDTO;
import com.sonidovivo.gestion_inventario.dto.StockResponseDTO;
import com.sonidovivo.gestion_inventario.exception.ConflictException;
import com.sonidovivo.gestion_inventario.exception.NotFoundException;
import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.model.Inventario;
import com.sonidovivo.gestion_inventario.model.MovimientoInventario;
import com.sonidovivo.gestion_inventario.repository.BodegaRepository;
import com.sonidovivo.gestion_inventario.repository.InventarioRepository;
import com.sonidovivo.gestion_inventario.repository.MovimientoInventarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventarioService {

    private final InventarioRepository inventarioRepo;
    private final BodegaRepository bodegaRepo;
    private final MovimientoInventarioRepository movimientoRepo;
    private final CatalogoClient catalogoClient;

    public List<Inventario> listar() {
        return inventarioRepo.findAll();
    }

    public List<Inventario> bajoStock() {
        return inventarioRepo.findBajoStock();
    }

    public StockResponseDTO stockProducto(Long idProducto) {
        int total = inventarioRepo.findByIdProductoOrderByIdAsc(idProducto).stream()
                .mapToInt(Inventario::getStockActual).sum();
        return new StockResponseDTO(idProducto, total);
    }

    public List<MovimientoInventario> movimientos(Long idInventario) {
        return movimientoRepo.findByInventarioIdOrderByFechaDesc(idInventario);
    }

    @Transactional
    public Inventario crear(InventarioRequestDTO dto) {
        catalogoClient.obtenerProducto(dto.getIdProducto());

        Bodega bodega = dto.getIdBodega() != null
                ? bodegaRepo.findById(dto.getIdBodega())
                        .orElseThrow(() -> new NotFoundException("Bodega " + dto.getIdBodega() + " no encontrada"))
                : bodegaRepo.findAll().stream().findFirst()
                        .orElseThrow(() -> new NotFoundException("No hay bodegas creadas"));

        if (inventarioRepo.findByIdProductoAndBodegaId(dto.getIdProducto(), bodega.getId()).isPresent()) {
            throw new ConflictException("El producto ya tiene inventario en la bodega " + bodega.getNombre());
        }

        Inventario inv = new Inventario();
        inv.setIdProducto(dto.getIdProducto());
        inv.setBodega(bodega);
        inv.setStockActual(dto.getStockInicial());
        inv.setStockMinimo(dto.getStockMinimo() != null ? dto.getStockMinimo() : 2);
        inv = inventarioRepo.save(inv);

        if (dto.getStockInicial() > 0) {
            registrar(inv, "ENTRADA", dto.getStockInicial(), "Stock inicial", null);
        }
        return inv;
    }

    @Transactional
    public StockResponseDTO agregar(MovimientoRequestDTO dto) {
        List<Inventario> filas = inventarioRepo.findByIdProductoOrderByIdAsc(dto.getIdProducto());
        if (filas.isEmpty()) {
            throw new NotFoundException(
                    "El producto " + dto.getIdProducto() + " no tiene inventario. Cree primero el stock inicial");
        }
        Inventario inv = filas.get(0);
        inv.setStockActual(inv.getStockActual() + dto.getCantidad());
        inventarioRepo.save(inv);
        registrar(inv, "ENTRADA", dto.getCantidad(), motivo(dto, "Reposición"), dto.getIdPedido());
        return stockProducto(dto.getIdProducto());
    }

    @Transactional
    public StockResponseDTO descontar(MovimientoRequestDTO dto) {
        List<Inventario> filas = inventarioRepo.findByIdProductoOrderByIdAsc(dto.getIdProducto());
        int disponible = filas.stream().mapToInt(Inventario::getStockActual).sum();
        if (disponible < dto.getCantidad()) {
            throw new ConflictException("Stock insuficiente para el producto " + dto.getIdProducto()
                    + " (disponible: " + disponible + ", solicitado: " + dto.getCantidad() + ")");
        }

        int restante = dto.getCantidad();
        for (Inventario inv : filas) {
            if (restante == 0) {
                break;
            }
            int quitar = Math.min(inv.getStockActual(), restante);
            if (quitar > 0) {
                inv.setStockActual(inv.getStockActual() - quitar);
                inventarioRepo.save(inv);
                registrar(inv, "SALIDA", quitar, motivo(dto, "Venta"), dto.getIdPedido());
                restante -= quitar;
            }
        }
        return stockProducto(dto.getIdProducto());
    }

    public List<Bodega> bodegas() {
        return bodegaRepo.findAll();
    }

    public Bodega crearBodega(String nombre, String ubicacion) {
        if (bodegaRepo.existsByNombre(nombre.trim())) {
            throw new ConflictException("La bodega " + nombre.trim() + " ya existe");
        }
        Bodega b = new Bodega();
        b.setNombre(nombre.trim());
        b.setUbicacion(ubicacion);
        return bodegaRepo.save(b);
    }

    private String motivo(MovimientoRequestDTO dto, String porDefecto) {
        return dto.getMotivo() != null && !dto.getMotivo().isBlank() ? dto.getMotivo() : porDefecto;
    }

    private void registrar(Inventario inv, String tipo, int cantidad, String motivo, Long idPedido) {
        MovimientoInventario m = new MovimientoInventario();
        m.setInventario(inv);
        m.setTipo(tipo);
        m.setCantidad(cantidad);
        m.setMotivo(motivo);
        m.setIdPedido(idPedido);
        movimientoRepo.save(m);
    }
}
