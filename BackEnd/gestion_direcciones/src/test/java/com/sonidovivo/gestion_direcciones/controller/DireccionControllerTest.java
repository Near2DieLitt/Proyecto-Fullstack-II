package com.sonidovivo.gestion_direcciones.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_direcciones.model.Comuna;
import com.sonidovivo.gestion_direcciones.model.Direccion;
import com.sonidovivo.gestion_direcciones.model.Region;
import com.sonidovivo.gestion_direcciones.dto.DireccionRequestDTO;
import com.sonidovivo.gestion_direcciones.exception.NotFoundException;
import com.sonidovivo.gestion_direcciones.exception.ConflictException;
import com.sonidovivo.gestion_direcciones.exception.UnauthorizedException;
import com.sonidovivo.gestion_direcciones.exception.GlobalExceptionHandler;
import feign.FeignException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import com.sonidovivo.gestion_direcciones.service.DireccionService;

@ExtendWith(MockitoExtension.class)
class DireccionControllerTest {
    @Mock private DireccionService service;
    @InjectMocks private DireccionController controller;

    @Test
    void porUsuarioDevuelveDireccionesMapeadas() {
        Region region = new Region();
        region.setNombre("Metropolitana");
        Comuna comuna = new Comuna();
        comuna.setId(3L);
        comuna.setNombre("Santiago");
        comuna.setRegion(region);
        Direccion direccion = new Direccion();
        direccion.setId(10L);
        direccion.setIdUsuario(7L);
        direccion.setCalle("Alameda");
        direccion.setNumero("123");
        direccion.setComuna(comuna);
        when(service.listarPorUsuario(7L)).thenReturn(List.of(direccion));

        var result = controller.porUsuario(7L);

        assertEquals(1, result.size());
        assertEquals("Santiago", result.get(0).getComuna());
    }

    @Test
    void obtenerDevuelveDireccion() {
        Direccion direccion = direccion();
        when(service.findByIdOrThrow(10L)).thenReturn(direccion);

        assertEquals(10L, controller.obtener(10L).getId());
    }

    @Test
    void obtenerPropagaErrorCuandoNoExiste() {
        when(service.findByIdOrThrow(99L)).thenThrow(new NotFoundException("No existe"));

        assertThrows(NotFoundException.class, () -> controller.obtener(99L));
    }

    @Test
    void crearDevuelve201YUbicacion() {
        Direccion direccion = direccion();
        DireccionRequestDTO request = new DireccionRequestDTO(7L, "Alameda", "123", null, null, 3L, true);
        when(service.crear(request)).thenReturn(direccion);

        var response = controller.crear(request);

        assertEquals(201, response.getStatusCode().value());
        assertEquals("/api/direcciones/10", response.getHeaders().getLocation().toString());
        verify(service).crear(request);
    }

    @Test
    void actualizarYEliminarDeleganEnService() {
        Direccion direccion = direccion();
        DireccionRequestDTO request = new DireccionRequestDTO(7L, "Alameda", "123", null, null, 3L, false);
        when(service.actualizar(10L, request)).thenReturn(direccion);

        assertEquals(10L, controller.actualizar(10L, request).getId());
        assertEquals(204, controller.eliminar(10L).getStatusCode().value());
        verify(service).eliminar(10L);
    }

    @Test
    void handlerCubreErroresDeNegocioYFeign() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        assertEquals(404, handler.noEncontrado(new NotFoundException("no"))
                .getStatusCode().value());
        assertEquals(409, handler.conflicto(new ConflictException("conflicto"))
                .getStatusCode().value());
        assertEquals(401, handler.noAutorizado(new UnauthorizedException("no autorizado"))
                .getStatusCode().value());

        for (int status : new int[] {404, 409, 400, 500}) {
            FeignException exception = mock(FeignException.class);
            when(exception.status()).thenReturn(status);
            int expected = status == 404 ? 404 : status == 409 ? 409 : status == 400 ? 400 : 502;
            assertEquals(expected, handler.feign(exception).getStatusCode().value());
        }

        MethodArgumentNotValidException validation = mock(MethodArgumentNotValidException.class);
        BindingResult binding = mock(BindingResult.class);
        when(validation.getBindingResult()).thenReturn(binding);
        when(binding.getFieldErrors()).thenReturn(List.of(new FieldError("request", "calle", "obligatoria")));
        assertEquals(400, handler.validacion(validation).getStatusCode().value());
    }

    private Direccion direccion() {
        Region region = new Region();
        region.setNombre("Metropolitana");
        Comuna comuna = new Comuna();
        comuna.setId(3L);
        comuna.setNombre("Santiago");
        comuna.setRegion(region);
        Direccion direccion = new Direccion();
        direccion.setId(10L);
        direccion.setIdUsuario(7L);
        direccion.setCalle("Alameda");
        direccion.setNumero("123");
        direccion.setComuna(comuna);
        return direccion;
    }
}
