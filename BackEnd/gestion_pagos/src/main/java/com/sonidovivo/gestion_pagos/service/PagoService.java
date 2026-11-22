package com.sonidovivo.gestion_pagos.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonidovivo.gestion_pagos.client.CambioEstadoDTO;
import com.sonidovivo.gestion_pagos.client.PedidoClient;
import com.sonidovivo.gestion_pagos.client.PedidoDTO;
import com.sonidovivo.gestion_pagos.dto.PagoRequestDTO;
import com.sonidovivo.gestion_pagos.exception.ConflictException;
import com.sonidovivo.gestion_pagos.exception.NotFoundException;
import com.sonidovivo.gestion_pagos.model.MetodoPago;
import com.sonidovivo.gestion_pagos.model.Pago;
import com.sonidovivo.gestion_pagos.repository.MetodoPagoRepository;
import com.sonidovivo.gestion_pagos.repository.PagoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final PagoRepository pagoRepo;
    private final MetodoPagoRepository metodoRepo;
    private final PedidoClient pedidoClient;

    public List<MetodoPago> metodosActivos() {
        return metodoRepo.findByActivoTrue();
    }

    public List<Pago> porPedido(Long idPedido) {
        return pagoRepo.findByIdPedidoOrderByFechaDesc(idPedido);
    }

    public Pago findByIdOrThrow(Long id) {
        return pagoRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Pago " + id + " no encontrado"));
    }

    @Transactional
    public Pago pagar(PagoRequestDTO dto) {
        PedidoDTO pedido = pedidoClient.obtenerPedido(dto.getIdPedido());
        if (!"CREADO".equals(pedido.getEstado())) {
            throw new ConflictException("El pedido no está pendiente de pago (estado: " + pedido.getEstado() + ")");
        }
        if (pagoRepo.existsByIdPedidoAndEstado(dto.getIdPedido(), "APROBADO")) {
            throw new ConflictException("El pedido ya tiene un pago aprobado");
        }
        MetodoPago metodo = metodoRepo.findById(dto.getIdMetodoPago())
                .orElseThrow(() -> new NotFoundException("Método de pago " + dto.getIdMetodoPago() + " no encontrado"));
        if (!Boolean.TRUE.equals(metodo.getActivo())) {
            throw new ConflictException("El método de pago " + metodo.getNombre() + " no está disponible");
        }

        boolean rechazado = dto.getNumeroTarjeta() != null && dto.getNumeroTarjeta().endsWith("0000");

        Pago pago = new Pago();
        pago.setIdPedido(dto.getIdPedido());
        pago.setMetodoPago(metodo);
        pago.setMonto(pedido.getTotal());
        pago.setCodigoTransaccion("TX-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase());
        pago.setEstado(rechazado ? "RECHAZADO" : "APROBADO");
        Pago guardado = pagoRepo.save(pago);

        if (!rechazado) {
            pedidoClient.cambiarEstado(dto.getIdPedido(), new CambioEstadoDTO("PAGADO"));
        }
        return guardado;
    }
}