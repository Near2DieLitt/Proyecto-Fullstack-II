package com.sonidovivo.gestion_usuarios.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sonidovivo.gestion_usuarios.dto.LoginRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.RegistroRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.UsuarioRequestDTO;
import com.sonidovivo.gestion_usuarios.exception.ConflictException;
import com.sonidovivo.gestion_usuarios.exception.UnauthorizedException;
import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.repository.RolRepository;
import com.sonidovivo.gestion_usuarios.repository.UsuarioRepository;



@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private RolRepository rolRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UsuarioService service;

    @Test
    void registrarGuardaUsuarioConClaveCifrada() {
        Rol cliente = new Rol();
        cliente.setNombre("CLIENTE");
        when(usuarioRepository.existsByCorreo("ana@correo.cl")).thenReturn(false);
        when(rolRepository.findByNombre("CLIENTE")).thenReturn(Optional.of(cliente));
        when(passwordEncoder.encode("secreto1")).thenReturn("HASH");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> i.getArgument(0));

        Usuario u = service.registrar(new RegistroRequestDTO("Ana", "Ana@Correo.cl", "secreto1", null));

        assertEquals("ana@correo.cl", u.getCorreo());
        assertEquals("HASH", u.getPassword());
        assertNotEquals("secreto1", u.getPassword());
    }

    @Test
    void registrarCorreoRepetidoLanzaConflicto() {
        when(usuarioRepository.existsByCorreo("ana@correo.cl")).thenReturn(true);

        assertThrows(ConflictException.class,
                () -> service.registrar(new RegistroRequestDTO("Ana", "ana@correo.cl", "secreto1", null)));
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void loginConClaveIncorrectaLanzaNoAutorizado() {
        PasswordEncoder real = new BCryptPasswordEncoder();
        Usuario u = new Usuario();
        u.setCorreo("ana@correo.cl");
        u.setPassword(real.encode("correcta"));
        when(usuarioRepository.findByCorreo("ana@correo.cl")).thenReturn(Optional.of(u));
        when(passwordEncoder.matches("incorrecta", u.getPassword())).thenReturn(false);

        assertThrows(UnauthorizedException.class,
                () -> service.login(new LoginRequestDTO("ana@correo.cl", "incorrecta")));
    }

    @Test
    void loginCorrectoListaYActualizaUsuario() {
        Usuario u = new Usuario();
        u.setId(4L);
        u.setCorreo("ana@correo.cl");
        u.setPassword("HASH");
        u.setActivo(true);
        when(usuarioRepository.findByCorreo("ana@correo.cl")).thenReturn(Optional.of(u));
        when(passwordEncoder.matches("secreto1", "HASH")).thenReturn(true);
        when(usuarioRepository.findAll()).thenReturn(java.util.List.of(u));
        when(usuarioRepository.findById(4L)).thenReturn(Optional.of(u));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals(u, service.login(new LoginRequestDTO(" ANA@CORREO.CL ", "secreto1")));
        assertEquals(1, service.listar().size());
        Usuario updated = service.actualizar(4L, new UsuarioRequestDTO("  Ana Nueva ", "999"));
        assertEquals("Ana Nueva", updated.getNombre());
        assertEquals("999", updated.getTelefono());
        assertEquals(false, service.cambiarActivo(4L, false).getActivo());
    }

    @Test
    void loginCuentaDesactivadaLanzaNoAutorizado() {
        Usuario u = new Usuario();
        u.setCorreo("ana@correo.cl");
        u.setPassword("HASH");
        u.setActivo(false);
        when(usuarioRepository.findByCorreo("ana@correo.cl")).thenReturn(Optional.of(u));
        when(passwordEncoder.matches("secreto1", "HASH")).thenReturn(true);

        assertThrows(UnauthorizedException.class,
                () -> service.login(new LoginRequestDTO("ana@correo.cl", "secreto1")));
    }

    @Test
    void listarRolesYRegistroSinRolValidanErrores() {
        when(rolRepository.findAll()).thenReturn(java.util.List.of(new Rol()));
        assertEquals(1, service.listarRoles().size());
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(jakarta.ws.rs.NotFoundException.class, () -> service.findByIdOrThrow(99L));
    }
}
