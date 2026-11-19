package com.sonidovivo.gestion_usuarios.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.repository.RolRepository;
import com.sonidovivo.gestion_usuarios.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            return;
        }
        crear("Administrador", "admin@sonidovivo.cl", "admin123", "ADMIN");
        crear("Cliente Demo", "cliente@sonidovivo.cl", "cliente123", "CLIENTE");
    }

    private void crear(String nombre, String correo, String clave, String nombreRol) {
        Rol rol = rolRepository.findByNombre(nombreRol).orElseThrow();
        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setCorreo(correo);
        u.setPassword(passwordEncoder.encode(clave));
        u.setRol(rol);
        usuarioRepository.save(u);
    }
}
