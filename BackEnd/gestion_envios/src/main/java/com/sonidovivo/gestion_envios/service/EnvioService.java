package com.sonidovivo.gestion_envios.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonidovivo.gestion_envios.client.CambioEstadoDTO;
import com.sonidovivo.gestion_envios.client.DireccionClient;
import com.sonidovivo.gestion_envios.client.PedidoClient;
import com.sonidovivo.gestion_envios.client.PedidoDTO;
import com.sonidovivo.gestion_envios.dto.EnvioRequestDTO;
import com.sonidovivo.gestion_envios.exception.ConflictException;
import com.sonidovivo.gestion_envios.exception.NotFoundException;
import com.sonidovivo.gestion_envios.model.Envio;
import com.sonidovivo.gestion_envios.model.HistorialEnvio;
import com.sonidovivo.gestion_envios.repository.EnvioRepository;
import com.sonidovivo.gestion_envios.repository.HistorialEnvioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnvioService {

    private static final Map<String, String> SIGUIENTE = Map.of(
            "PREPARANDO", "EN_CAMINO",
            "EN_CAMINO", "ENTREGADO");

    private final EnvioRepository envioRepo;
    private final HistorialEnvioRepository historialRepo;
    private final PedidoClient pedidoClient;
    private final DireccionClient direccionClient;

    public List<Envio> listar() {
        return envioRepo.findAll();
    }

    public Envio findByIdOrThrow(Long id) {
        return envioRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Envío " + id + " no encontrado"));
    }

    public Envio porPedido(Long idPedido) {
        return envioRepo.findByIdPedido(idPedido)
                .orElseThrow(() -> new NotFoundException("El pedido " + idPedido + " aún no tiene envío"));
    }

    public Envio porCodigo(String codigo) {
        return envioRepo.findByCodigoSeguimiento(codigo.trim().toUpperCase())
                .orElseThrow(() -> new NotFoundException("Código de seguimiento " + codigo + " no existe"));
    }

    public List<HistorialEnvio> historial(Long idEnvio) {
        findByIdOrThrow(idEnvio);
        return historialRepo.findByIdEnvioOrderByFechaAsc(idEnvio);
    }

    @Transactional
    public Envio crear(EnvioRequestDTO dto) {
        PedidoDTO pedido = pedidoClient.obtenerPedido(dto.getIdPedido());
        if (!"PAGADO".equals(pedido.getEstado())) {
            throw new ConflictException("Solo se puede despachar un pedido pagado (estado: " + pedido.getEstado() + ")");
        }
        if (envioRepo.existsByIdPedido(dto.getIdPedido())) {
            throw new ConflictException("El pedido " + dto.getIdPedido() + " ya tiene un envío");
        }
        direccionClient.obtenerDireccion(pedido.getIdDireccion());

        Envio e = new Envio();
        e.setIdPedido(dto.getIdPedido());
        e.setIdDireccion(pedido.getIdDireccion());
        e.setEmpresa(dto.getEmpresa().trim());
        e.setCodigoSeguimiento(generarCodigo());
        e.setEstado("PREPARANDO");
        e.setFechaEstimada(dto.getFechaEstimada() != null ? dto.getFechaEstimada() : LocalDate.now().plusDays(5));
        Envio guardado = envioRepo.save(e);

        registrar(guardado.getId(), "PREPARANDO", "Envío creado");
        return guardado;
    }

    @Transactional
    public Envio cambiarEstado(Long id, String nuevo, String detalle) {
        Envio e = findByIdOrThrow(id);
        if (!nuevo.equals(SIGUIENTE.get(e.getEstado()))) {
            throw new ConflictException("No se puede pasar el envío de " + e.getEstado() + " a " + nuevo);
        }
        String estadoPedido = "EN_CAMINO".equals(nuevo) ? "DESPACHADO" : "ENTREGADO";
        pedidoClient.cambiarEstado(e.getIdPedido(), new CambioEstadoDTO(estadoPedido));

        e.setEstado(nuevo);
        Envio guardado = envioRepo.save(e);
        registrar(guardado.getId(), nuevo, detalle);
        return guardado;
    }

    private void registrar(Long idEnvio, String estado, String detalle) {
        HistorialEnvio h = new HistorialEnvio();
        h.setIdEnvio(idEnvio);
        h.setEstado(estado);
        h.setDetalle(detalle);
        historialRepo.save(h);
    }

    private String generarCodigo() {
        String codigo;
        do {
            codigo = "SV-" + ThreadLocalRandom.current().nextInt(10_000_000, 100_000_000);
        } while (envioRepo.existsByCodigoSeguimiento(codigo));
        return codigo;
    }
}
