package com.sonidovivo.gestion_mensajeria.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_mensajeria.dto.ContactoRequestDTO;
import com.sonidovivo.gestion_mensajeria.dto.EstadoRequestDTO;
import com.sonidovivo.gestion_mensajeria.dto.RespuestaRequestDTO;
import com.sonidovivo.gestion_mensajeria.model.Mensajeria;
import com.sonidovivo.gestion_mensajeria.service.MensajeriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contactos")
@RequiredArgsConstructor
@Tag(name = "Contactos", description = "Formulario de contacto")
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class MensajeriaController {

    private final MensajeriaService service;

    @PostMapping
    @Operation(summary = "Guardar un mensaje de contacto")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Guardado"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<Mensajeria> guardar(@Valid @RequestBody ContactoRequestDTO dto) {
        Mensajeria guardado = service.guardar(dto);
        return ResponseEntity.created(URI.create("/api/contactos/" + guardado.getId())).body(guardado);
    }

    @GetMapping
    @Operation(summary = "Listar mensajes (opcional: ?estado=PENDIENTE)")
    public List<Mensajeria> listar(@RequestParam(required = false) String estado) {
        return service.listar(estado);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un mensaje")
    public Mensajeria obtener(@PathVariable Long id) {
        return service.findByIdOrThrow(id);
    }

    @PutMapping("/{id}/estado")
    @Operation(summary = "Cambiar el estado del mensaje")
    public Mensajeria estado(@PathVariable Long id, @Valid @RequestBody EstadoRequestDTO dto) {
        return service.cambiarEstado(id, dto.getEstado());
    }

    @PutMapping("/{id}/respuesta")
    @Operation(summary = "Guardar la respuesta (deja el mensaje en RESPONDIDO)")
    public Mensajeria responder(@PathVariable Long id, @Valid @RequestBody RespuestaRequestDTO dto) {
        return service.responder(id, dto.getRespuesta());
    }
}
