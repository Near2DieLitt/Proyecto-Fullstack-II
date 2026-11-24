package com.sonidovivo.gestion_catalogo.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_catalogo.model.Categoria;
import com.sonidovivo.gestion_catalogo.model.Marca;

@DataJpaTest(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop" })
class CatalogoRepositoryTest {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Test
    void buscaCategoriaYMarcaPorNombre() {
        Categoria categoria = new Categoria();
        categoria.setNombre("Rock");
        categoriaRepository.save(categoria);

        Marca marca = new Marca();
        marca.setNombre("Yamaha");
        marcaRepository.save(marca);

        assertTrue(categoriaRepository.existsByNombre("Rock"));
        assertTrue(marcaRepository.findByNombre("Yamaha").isPresent());
    }
}
