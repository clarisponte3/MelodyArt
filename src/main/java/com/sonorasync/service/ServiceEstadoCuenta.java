package com.sonorasync.service;

import com.sonorasync.dto.request.EstadoCuentaRequestDTO;
import com.sonorasync.dto.response.EstadoCuentaResponseDTO;
import com.sonorasync.model.ConceptoPago;
import com.sonorasync.model.EstadoCuenta;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryConceptoPago;
import com.sonorasync.repository.RepositoryEstadoCuenta;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceConceptoPago;
import com.sonorasync.service.ServiceUsuario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEstadoCuenta {
    @Autowired private RepositoryEstadoCuenta repository;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;
    @Autowired private RepositoryConceptoPago repositoryConceptoPago;
    @Autowired private ServiceConceptoPago serviceConceptoPago;

    public List<EstadoCuentaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public EstadoCuentaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public EstadoCuentaResponseDTO save(EstadoCuentaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public EstadoCuentaResponseDTO update(Long id, EstadoCuentaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdUsuarioAlumno() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioAlumno()).ifPresent(entity::setAlumno);
            }
            if (dto.getIdConceptoPago() != null) {
                repositoryConceptoPago.findById(dto.getIdConceptoPago()).ifPresent(entity::setConceptoPago);
            }
            if (dto.getPeriodo() != null) entity.setPeriodo(dto.getPeriodo());
            if (dto.getFechaEmision() != null) entity.setFechaEmision(dto.getFechaEmision());
            if (dto.getFechaVencimiento() != null) entity.setFechaVencimiento(dto.getFechaVencimiento());
            if (dto.getMonto() != null) entity.setMonto(dto.getMonto());
            if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public EstadoCuentaResponseDTO toResponseDTO(EstadoCuenta entity) {
        if (entity == null) return null;
        EstadoCuentaResponseDTO dto = new EstadoCuentaResponseDTO();
        dto.setIdEstadoCuenta(entity.getIdEstadoCuenta());
        if (entity.getAlumno() != null) {
            dto.setAlumno(serviceUsuario.toResponseDTO(entity.getAlumno()));
        }
        if (entity.getConceptoPago() != null) {
            dto.setConceptoPago(serviceConceptoPago.toResponseDTO(entity.getConceptoPago()));
        }
        dto.setPeriodo(entity.getPeriodo());
        dto.setFechaEmision(entity.getFechaEmision());
        dto.setFechaVencimiento(entity.getFechaVencimiento());
        dto.setMonto(entity.getMonto());
        dto.setEstado(entity.getEstado());
        return dto;
    }

    public EstadoCuenta toEntity(EstadoCuentaRequestDTO dto) {
        if (dto == null) return null;
        EstadoCuenta entity = new EstadoCuenta();
        if (dto.getIdUsuarioAlumno() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioAlumno()).ifPresent(entity::setAlumno);
        }
        if (dto.getIdConceptoPago() != null) {
            repositoryConceptoPago.findById(dto.getIdConceptoPago()).ifPresent(entity::setConceptoPago);
        }
        if (dto.getPeriodo() != null) entity.setPeriodo(dto.getPeriodo());
        if (dto.getFechaEmision() != null) entity.setFechaEmision(dto.getFechaEmision());
        if (dto.getFechaVencimiento() != null) entity.setFechaVencimiento(dto.getFechaVencimiento());
        if (dto.getMonto() != null) entity.setMonto(dto.getMonto());
        if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
        return entity;
    }
}
