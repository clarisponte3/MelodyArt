package com.sonorasync.service;

import com.sonorasync.dto.request.PagoMensualidadRequestDTO;
import com.sonorasync.dto.response.PagoMensualidadResponseDTO;
import com.sonorasync.model.PagoMensualidad;
import com.sonorasync.repository.RepositoryEstadoCuenta;
import com.sonorasync.repository.RepositoryMetodoPago;
import com.sonorasync.repository.RepositoryPagoMensualidad;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicePagoMensualidad {

    private final RepositoryPagoMensualidad repository;
    private final RepositoryEstadoCuenta repositoryEstadoCuenta;
    private final ServiceEstadoCuenta serviceEstadoCuenta;
    private final RepositoryMetodoPago repositoryMetodoPago;
    private final ServiceMetodoPago serviceMetodoPago;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;

    @Transactional(readOnly = true)
    public List<PagoMensualidadResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PagoMensualidadResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public PagoMensualidadResponseDTO save(PagoMensualidadRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public PagoMensualidadResponseDTO update(Long id, PagoMensualidadRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdEstadoCuenta() != null) {
                repositoryEstadoCuenta.findById(dto.getIdEstadoCuenta()).ifPresent(entity::setEstadoCuenta);
            }
            if (dto.getIdMetodoPago() != null) {
                repositoryMetodoPago.findById(dto.getIdMetodoPago()).ifPresent(entity::setMetodoPago);
            }
            if (dto.getIdUsuarioRegistra() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioRegistra()).ifPresent(entity::setUsuarioRegistra);
            }
            if (dto.getFechaPago() != null) entity.setFechaPago(dto.getFechaPago());
            if (dto.getMontoPagado() != null) entity.setMontoPagado(dto.getMontoPagado());
            if (dto.getReferencia() != null) entity.setReferencia(dto.getReferencia());
            if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PagoMensualidadResponseDTO toResponseDTO(PagoMensualidad entity) {
        if (entity == null) return null;
        PagoMensualidadResponseDTO dto = new PagoMensualidadResponseDTO();
        dto.setIdPago(entity.getIdPago());
        if (entity.getEstadoCuenta() != null) {
            dto.setEstadoCuenta(serviceEstadoCuenta.toResponseDTO(entity.getEstadoCuenta()));
        }
        if (entity.getMetodoPago() != null) {
            dto.setMetodoPago(serviceMetodoPago.toResponseDTO(entity.getMetodoPago()));
        }
        if (entity.getUsuarioRegistra() != null) {
            dto.setUsuarioRegistra(serviceUsuario.toResponseDTO(entity.getUsuarioRegistra()));
        }
        dto.setFechaPago(entity.getFechaPago());
        dto.setMontoPagado(entity.getMontoPagado());
        dto.setReferencia(entity.getReferencia());
        dto.setObservaciones(entity.getObservaciones());
        return dto;
    }

    public PagoMensualidad toEntity(PagoMensualidadRequestDTO dto) {
        if (dto == null) return null;
        PagoMensualidad entity = new PagoMensualidad();
        if (dto.getIdEstadoCuenta() != null) {
            repositoryEstadoCuenta.findById(dto.getIdEstadoCuenta()).ifPresent(entity::setEstadoCuenta);
        }
        if (dto.getIdMetodoPago() != null) {
            repositoryMetodoPago.findById(dto.getIdMetodoPago()).ifPresent(entity::setMetodoPago);
        }
        if (dto.getIdUsuarioRegistra() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioRegistra()).ifPresent(entity::setUsuarioRegistra);
        }
        if (dto.getFechaPago() != null) entity.setFechaPago(dto.getFechaPago());
        if (dto.getMontoPagado() != null) entity.setMontoPagado(dto.getMontoPagado());
        if (dto.getReferencia() != null) entity.setReferencia(dto.getReferencia());
        if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
        return entity;
    }
}
