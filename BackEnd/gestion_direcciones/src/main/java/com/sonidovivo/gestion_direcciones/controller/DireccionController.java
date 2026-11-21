package com.sonidovivo.gestion_direcciones.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_direcciones.dto.DireccionRequestDTO;
import com.sonidovivo.gestion_direcciones.dto.DireccionResponseDTO;
import com.sonidovivo.gestion_direcciones.model.Direccion;
import com.sonidovivo.gestion_direcciones.service.DireccionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/direcciones")
@RequiredArgsConstructor
@Tag(name = "Direcciones", description = "Direcciones de despacho")
public class DireccionController {

    private final DireccionService service;

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Direcciones de un usuario")
    public List<DireccionResponseDTO> porUsuario(@PathVariable Long idUsuario) {
        return service.listarPorUsuario(idUsuario).stream().map(DireccionResponseDTO::from).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una direccion")
    public DireccionResponseDTO obtener(@PathVariable Long id) {
        return DireccionResponseDTO.from(service.findByIdOrThrow(id));
    }

    @PostMapping
    @Operation(summary = "Crear una direccion")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Creada"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Usuario o comuna no existe")
    })
    public ResponseEntity<DireccionResponseDTO> crear(@Valid @RequestBody DireccionRequestDTO dto) {
        Direccion d = service.crear(dto);
        return ResponseEntity.created(URI.create("/api/direcciones/" + d.getId()))
                .body(DireccionResponseDTO.from(d));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar una direccion")
    public DireccionResponseDTO actualizar(@PathVariable Long id, @Valid @RequestBody DireccionRequestDTO dto) {
        return DireccionResponseDTO.from(service.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una direccion")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
