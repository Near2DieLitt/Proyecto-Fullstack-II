package com.sonidovivo.gestion_usuarios.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.model.Usuario;

@DataJpaTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:usuarios;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.flyway.enabled=false"})
class UsuarioRepositoryTest {
    @Autowired private UsuarioRepository repository;
    @Autowired private RolRepository rolRepository;

    @Test
    void buscaUsuarioPorCorreo() {
        Rol rol = new Rol();
        rol.setNombre("CLIENTE");
        rol = rolRepository.save(rol);
        Usuario usuario = new Usuario();
        usuario.setNombre("Ana");
        usuario.setCorreo("ana@correo.cl");
        usuario.setPassword("hash");
        usuario.setRol(rol);
        repository.save(usuario);

        assertTrue(repository.findByCorreo("ana@correo.cl").isPresent());
        assertTrue(repository.existsByCorreo("ana@correo.cl"));
    }
}
