package com.sonidovivo.gestion_configuracion.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.sonidovivo.gestion_configuracion.dto.ConfiguracionRequestDTO;
import com.sonidovivo.gestion_configuracion.exception.ConflictException;
import com.sonidovivo.gestion_configuracion.exception.NotFoundException;
import com.sonidovivo.gestion_configuracion.model.Configuracion;
import com.sonidovivo.gestion_configuracion.repository.ConfiguracionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class ConfiguracionService {

    private final ConfiguracionRepository repository;

    public List<Configuracion> listar() {
        return repository.findAll();
    }

    public Configuracion obtener(String clave) {
        return repository.findById(clave.toUpperCase())
                .orElseThrow(() -> new NotFoundException("No existe el parámetro " + clave));
    }

    public Configuracion crear(ConfiguracionRequestDTO dto) {
        String clave = dto.getClave().toUpperCase();
        if (repository.existsById(clave)) {
            throw new ConflictException("Ya existe el parámetro " + clave);
        }
        return repository.save(new Configuracion(clave, dto.getValor(), dto.getDescripcion()));
    }

    public Configuracion actualizarValor(String clave, String valor) {
        Configuracion c = obtener(clave);
        c.setValor(valor);
        return repository.save(c);
    }

    public void eliminar(String clave) {
        repository.delete(obtener(clave));
    }
}
