package com.sonidovivo.gestion_direcciones.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonidovivo.gestion_direcciones.client.UsuarioClient;
import com.sonidovivo.gestion_direcciones.dto.DireccionRequestDTO;
import com.sonidovivo.gestion_direcciones.exception.NotFoundException;
import com.sonidovivo.gestion_direcciones.model.Comuna;
import com.sonidovivo.gestion_direcciones.model.Direccion;
import com.sonidovivo.gestion_direcciones.repository.ComunaRepository;
import com.sonidovivo.gestion_direcciones.repository.DireccionRepository;
import com.sonidovivo.gestion_direcciones.repository.RegionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DireccionService {

    private final DireccionRepository direccionRepository;
    private final ComunaRepository comunaRepository;
    private final RegionRepository regionRepository;
    private final UsuarioClient usuarioClient;

    public List<com.sonidovivo.gestion_direcciones.model.Region> listarRegiones() {
        return regionRepository.findAll();
    }

    public List<Comuna> listarComunas(Long idRegion) {
        return comunaRepository.findByRegionId(idRegion);
    }

    public List<Direccion> listarPorUsuario(Long idUsuario) {
        return direccionRepository.findByIdUsuario(idUsuario);
    }

    public Direccion findByIdOrThrow(Long id) {
        return direccionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Dirección " + id + " no encontrada"));
    }

    @Transactional
    public Direccion crear(DireccionRequestDTO dto) {
        usuarioClient.obtenerUsuario(dto.getIdUsuario());

        Direccion d = new Direccion();
        d.setIdUsuario(dto.getIdUsuario());
        aplicar(d, dto);

        boolean primera = direccionRepository.findByIdUsuario(dto.getIdUsuario()).isEmpty();
        d.setPrincipal(primera || Boolean.TRUE.equals(dto.getPrincipal()));
        if (d.getPrincipal()) {
            quitarPrincipalDeLasOtras(dto.getIdUsuario(), null);
        }
        return direccionRepository.save(d);
    }

    @Transactional
    public Direccion actualizar(Long id, DireccionRequestDTO dto) {
        Direccion d = findByIdOrThrow(id);
        aplicar(d, dto);
        if (Boolean.TRUE.equals(dto.getPrincipal())) {
            d.setPrincipal(true);
            quitarPrincipalDeLasOtras(d.getIdUsuario(), d.getId());
        }
        return direccionRepository.save(d);
    }

    public void eliminar(Long id) {
        direccionRepository.delete(findByIdOrThrow(id));
    }

    private void aplicar(Direccion d, DireccionRequestDTO dto) {
        Comuna comuna = comunaRepository.findById(dto.getIdComuna())
                .orElseThrow(() -> new NotFoundException("Comuna " + dto.getIdComuna() + " no encontrada"));
        d.setCalle(dto.getCalle().trim());
        d.setNumero(dto.getNumero().trim());
        d.setDepto(dto.getDepto());
        d.setReferencia(dto.getReferencia());
        d.setComuna(comuna);
    }

    private void quitarPrincipalDeLasOtras(Long idUsuario, Long idExcepto) {
        for (Direccion otra : direccionRepository.findByIdUsuario(idUsuario)) {
            if (!otra.getId().equals(idExcepto) && Boolean.TRUE.equals(otra.getPrincipal())) {
                otra.setPrincipal(false);
                direccionRepository.save(otra);
            }
        }
    }
}
