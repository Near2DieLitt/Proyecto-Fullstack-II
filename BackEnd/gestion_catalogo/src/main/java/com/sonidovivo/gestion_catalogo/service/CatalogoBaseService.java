package com.sonidovivo.gestion_catalogo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sonidovivo.gestion_catalogo.exception.ConflictException;
import com.sonidovivo.gestion_catalogo.model.Categoria;
import com.sonidovivo.gestion_catalogo.model.Marca;
import com.sonidovivo.gestion_catalogo.repository.CategoriaRepository;
import com.sonidovivo.gestion_catalogo.repository.MarcaRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CatalogoBaseService {

    private final CategoriaRepository categoriaRepo;
    private final MarcaRepository marcaRepo;

    public List<Categoria> categorias() {
        return categoriaRepo.findAll();
    }

    public Categoria crearCategoria(String nombre) {
        String n = nombre.trim();
        if (categoriaRepo.existsByNombre(n)) {
            throw new ConflictException("La categoría " + n + " ya existe");
        }
        Categoria c = new Categoria();
        c.setNombre(n);
        return categoriaRepo.save(c);
    }

    public List<Marca> marcas() {
        return marcaRepo.findAll();
    }

    public Marca crearMarca(String nombre) {
        String n = nombre.trim();
        if (marcaRepo.existsByNombre(n)) {
            throw new ConflictException("La marca " + n + " ya existe");
        }
        Marca m = new Marca();
        m.setNombre(n);
        return marcaRepo.save(m);
    }
}
