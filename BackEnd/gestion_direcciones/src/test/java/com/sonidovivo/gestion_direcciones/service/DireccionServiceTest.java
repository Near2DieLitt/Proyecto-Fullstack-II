package com.sonidovivo.gestion_direcciones.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_direcciones.client.UsuarioClient;
import com.sonidovivo.gestion_direcciones.dto.DireccionRequestDTO;
import com.sonidovivo.gestion_direcciones.model.Comuna;
import com.sonidovivo.gestion_direcciones.model.Direccion;
import com.sonidovivo.gestion_direcciones.repository.ComunaRepository;
import com.sonidovivo.gestion_direcciones.repository.DireccionRepository;
import com.sonidovivo.gestion_direcciones.repository.RegionRepository;
import com.sonidovivo.gestion_direcciones.exception.NotFoundException;

@ExtendWith(MockitoExtension.class)
class DireccionServiceTest {
    @Mock private DireccionRepository direccionRepository;
    @Mock private ComunaRepository comunaRepository;
    @Mock private RegionRepository regionRepository;
    @Mock private UsuarioClient usuarioClient;
    @InjectMocks private DireccionService service;

    @Test
    void crearDireccionLaMarcaComoPrincipalSiEsLaPrimera() {
        Comuna comuna = new Comuna();
        comuna.setId(3L);
        comuna.setNombre("Santiago");
        when(comunaRepository.findById(3L)).thenReturn(Optional.of(comuna));
        when(direccionRepository.findByIdUsuario(7L)).thenReturn(java.util.List.of());
        when(direccionRepository.save(any(Direccion.class))).thenAnswer(i -> i.getArgument(0));

        Direccion direccion = service.crear(new DireccionRequestDTO(7L, "  Alameda ", "123", null, null, 3L, false));

        assertEquals("Alameda", direccion.getCalle());
        assertEquals(true, direccion.getPrincipal());
        assertEquals(comuna, direccion.getComuna());
    }

    @Test
    void consultaActualizaEliminaYValidaDirecciones() {
        Comuna comuna = new Comuna();
        comuna.setId(3L);
        comuna.setNombre("Santiago");
        Direccion actual = new Direccion();
        actual.setId(8L);
        actual.setIdUsuario(7L);
        actual.setComuna(comuna);
        actual.setPrincipal(false);
        Direccion otra = new Direccion();
        otra.setId(9L);
        otra.setPrincipal(true);
        when(regionRepository.findAll()).thenReturn(java.util.List.of());
        when(comunaRepository.findByRegionId(1L)).thenReturn(java.util.List.of(comuna));
        when(direccionRepository.findByIdUsuario(7L)).thenReturn(java.util.List.of(actual, otra));
        when(direccionRepository.findById(8L)).thenReturn(Optional.of(actual));
        when(comunaRepository.findById(3L)).thenReturn(Optional.of(comuna));
        when(direccionRepository.save(any(Direccion.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals(0, service.listarRegiones().size());
        assertEquals(1, service.listarComunas(1L).size());
        assertEquals(2, service.listarPorUsuario(7L).size());
        Direccion updated = service.actualizar(8L,
                new DireccionRequestDTO(7L, "Nueva", "22", null, null, 3L, true));
        assertEquals("Nueva", updated.getCalle());
        verify(direccionRepository).save(otra);
        service.eliminar(8L);
        verify(direccionRepository).delete(actual);
    }

    @Test
    void erroresDeDireccionYComunaSePropagan() {
        when(direccionRepository.findById(100L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> service.findByIdOrThrow(100L));
        when(comunaRepository.findById(3L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> service.crear(
                new DireccionRequestDTO(7L, "Calle", "1", null, null, 3L, false)));
    }
}
