package com.sonidovivo.gestion_configuracion.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_configuracion.dto.ConfiguracionRequestDTO;
import com.sonidovivo.gestion_configuracion.exception.ConflictException;
import com.sonidovivo.gestion_configuracion.exception.NotFoundException;
import com.sonidovivo.gestion_configuracion.model.Configuracion;
import com.sonidovivo.gestion_configuracion.repository.ConfiguracionRepository;

@ExtendWith(MockitoExtension.class)
class ConfiguracionServiceTest {

    @Mock
    private ConfiguracionRepository repository;

    @InjectMocks
    private ConfiguracionService service;

    @Test
    void creaActualizaListaYElimina() {
        Configuracion configuracion = new Configuracion("IVA", "19", "Impuesto");
        when(repository.existsById("IVA")).thenReturn(false);
        when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(repository.findAll()).thenReturn(List.of(configuracion));
        when(repository.findById("IVA")).thenReturn(Optional.of(configuracion));

        assertEquals("IVA", service.crear(new ConfiguracionRequestDTO("iva", "19", "Impuesto")).getClave());
        assertEquals(1, service.listar().size());
        assertEquals("20", service.actualizarValor("iva", "20").getValor());
        service.eliminar("iva");
        verify(repository).delete(configuracion);
    }

    @Test
    void rechazaDuplicadoYClaveInexistente() {
        when(repository.existsById("IVA")).thenReturn(true);
        when(repository.findById("INEXISTENTE")).thenReturn(Optional.empty());

        assertThrows(ConflictException.class,
        () -> service.crear(new ConfiguracionRequestDTO("iva", "19", null)));
        assertThrows(NotFoundException.class, () -> service.obtener("inexistente"));
    }
}