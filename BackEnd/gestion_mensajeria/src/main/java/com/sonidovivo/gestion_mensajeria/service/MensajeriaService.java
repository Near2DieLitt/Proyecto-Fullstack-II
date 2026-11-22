package com.sonidovivo.gestion_mensajeria.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sonidovivo.gestion_mensajeria.dto.ContactoRequestDTO;
import com.sonidovivo.gestion_mensajeria.exception.NotFoundException;
import com.sonidovivo.gestion_mensajeria.model.Mensajeria;
import com.sonidovivo.gestion_mensajeria.repository.MensajeriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MensajeriaService {

    private final MensajeriaRepository repository;

    public Mensajeria guardar(ContactoRequestDTO dto) {
        Mensajeria m = new Mensajeria();
        m.setNombreCompleto(dto.getNombreCompleto().trim());
        m.setCorreo(dto.getCorreo().trim());
        m.setMensaje(dto.getMensaje().trim());
        m.setEstado("PENDIENTE");
        return repository.save(m);
    }

    public List<Mensajeria> listar(String estado) {
        if (estado == null || estado.isBlank()) {
            return repository.findAll();
        }
        return repository.findByEstado(estado.toUpperCase());
    }

    public Mensajeria findByIdOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mensaje " + id + " no encontrado"));
    }

    public Mensajeria cambiarEstado(Long id, String estado) {
        Mensajeria m = findByIdOrThrow(id);
        m.setEstado(estado);
        return repository.save(m);
    }

    public Mensajeria responder(Long id, String respuesta) {
        Mensajeria m = findByIdOrThrow(id);
        m.setRespuesta(respuesta.trim());
        m.setFechaRespuesta(LocalDateTime.now());
        m.setEstado("RESPONDIDO");
        return repository.save(m);
    }
}
