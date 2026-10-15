package com.sonorasync.service;

import com.sonorasync.dto.request.PagoMensualidadRequestDTO;
import com.sonorasync.dto.response.PagoMensualidadResponseDTO;
import com.sonorasync.model.EstadoCuenta;
import com.sonorasync.model.MetodoPago;
import com.sonorasync.model.PagoMensualidad;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryEstadoCuenta;
import com.sonorasync.repository.RepositoryMetodoPago;
import com.sonorasync.repository.RepositoryPagoMensualidad;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceEstadoCuenta;
import com.sonorasync.service.ServiceMetodoPago;
import com.sonorasync.service.ServiceUsuario;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicePagoMensualidad {
    @Autowired private RepositoryPagoMensualidad repository;
    @Autowired private RepositoryEstadoCuenta repositoryEstadoCuenta;
    @Autowired private ServiceEstadoCuenta serviceEstadoCuenta;
    @Autowired private RepositoryMetodoPago repositoryMetodoPago;
    @Autowired private ServiceMetodoPago serviceMetodoPago;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;

    public List<PagoMensualidadResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public PagoMensualidadResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public PagoMensualidadResponseDTO save(PagoMensualidadRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

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
