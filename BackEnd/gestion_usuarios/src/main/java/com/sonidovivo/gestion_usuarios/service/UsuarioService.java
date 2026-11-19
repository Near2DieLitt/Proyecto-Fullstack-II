package com.sonidovivo.gestion_usuarios.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sonidovivo.gestion_usuarios.dto.LoginRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.RegistroRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.UsuarioRequestDTO;
import com.sonidovivo.gestion_usuarios.exception.ConflictException;
import com.sonidovivo.gestion_usuarios.exception.UnauthorizedException;
import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.repository.RolRepository;
import com.sonidovivo.gestion_usuarios.repository.UsuarioRepository;

import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public Usuario registrar(RegistroRequestDTO dto) {
        String correo = dto.getCorreo().trim().toLowerCase();
        if (usuarioRepository.existsByCorreo(correo)) {
            throw new ConflictException("El correo " + correo + " ya está registrado");
        }
        Rol cliente = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() -> new NotFoundException("Rol CLIENTE no existe"));

        Usuario u = new Usuario();
        u.setNombre(dto.getNombre().trim());
        u.setCorreo(correo);
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setTelefono(dto.getTelefono());
        u.setRol(cliente);
        return usuarioRepository.save(u);
    }

    public Usuario login(LoginRequestDTO dto) {
        Usuario u = usuarioRepository.findByCorreo(dto.getCorreo().trim().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Correo o contraseña incorrectos"));
        if (!passwordEncoder.matches(dto.getPassword(), u.getPassword())) {
            throw new UnauthorizedException("Correo o contraseña incorrectos");
        }
        if (!Boolean.TRUE.equals(u.getActivo())) {
            throw new UnauthorizedException("La cuenta está desactivada");
        }
        return u;
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario findByIdOrThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Usuario " + id + " no encontrado"));
    }

    public Usuario actualizar(Long id, UsuarioRequestDTO dto) {
        Usuario u = findByIdOrThrow(id);
        u.setNombre(dto.getNombre().trim());
        u.setTelefono(dto.getTelefono());
        return usuarioRepository.save(u);
    }

    public Usuario cambiarActivo(Long id, boolean activo) {
        Usuario u = findByIdOrThrow(id);
        u.setActivo(activo);
        return usuarioRepository.save(u);
    }

    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }
}
