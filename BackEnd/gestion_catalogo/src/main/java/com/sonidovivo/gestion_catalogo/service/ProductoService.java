package com.sonidovivo.gestion_catalogo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sonidovivo.gestion_catalogo.dto.ProductoRequestDTO;
import com.sonidovivo.gestion_catalogo.exception.NotFoundException;
import com.sonidovivo.gestion_catalogo.model.Producto;
import com.sonidovivo.gestion_catalogo.repository.CategoriaRepository;
import com.sonidovivo.gestion_catalogo.repository.MarcaRepository;
import com.sonidovivo.gestion_catalogo.repository.ProductoRepository;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository repo;
    private final CategoriaRepository categoriaRepo;
    private final MarcaRepository marcaRepo;

    public List<Producto> listar(Long idCategoria, Long idMarca, BigDecimal min, BigDecimal max,
            String q, Boolean destacado) {
        Specification<Producto> spec = (root, query, cb) -> {
            List<Predicate> ps = new ArrayList<>();
            ps.add(cb.isTrue(root.get("activo")));
            if (idCategoria != null) {
                ps.add(cb.equal(root.get("categoria").get("id"), idCategoria));
            }
            if (idMarca != null) {
                ps.add(cb.equal(root.get("marca").get("id"), idMarca));
            }
            if (min != null) {
                ps.add(cb.greaterThanOrEqualTo(root.<BigDecimal>get("precio"), min));
            }
            if (max != null) {
                ps.add(cb.lessThanOrEqualTo(root.<BigDecimal>get("precio"), max));
            }
            if (q != null && !q.isBlank()) {
                ps.add(cb.like(cb.lower(root.<String>get("nombre")), "%" + q.trim().toLowerCase() + "%"));
            }
            if (destacado != null) {
                ps.add(cb.equal(root.get("destacado"), destacado));
            }
            return cb.and(ps.toArray(new Predicate[0]));
        };
        return repo.findAll(spec);
    }

    public Producto findByIdOrThrow(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto " + id + " no encontrado"));
    }

    public Producto crear(ProductoRequestDTO dto) {
        Producto p = new Producto();
        aplicar(p, dto);
        return repo.save(p);
    }

    public Producto actualizar(Long id, ProductoRequestDTO dto) {
        Producto p = findByIdOrThrow(id);
        aplicar(p, dto);
        return repo.save(p);
    }

    public void eliminar(Long id) {
        repo.delete(findByIdOrThrow(id));
    }

    private void aplicar(Producto p, ProductoRequestDTO dto) {
        p.setNombre(dto.getNombre().trim());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setImagenUrl(dto.getImagenUrl());
        p.setDestacado(Boolean.TRUE.equals(dto.getDestacado()));
        p.setCategoria(categoriaRepo.findById(dto.getIdCategoria())
                .orElseThrow(() -> new NotFoundException("Categoría " + dto.getIdCategoria() + " no encontrada")));
        p.setMarca(marcaRepo.findById(dto.getIdMarca())
                .orElseThrow(() -> new NotFoundException("Marca " + dto.getIdMarca() + " no encontrada")));
    }
}
