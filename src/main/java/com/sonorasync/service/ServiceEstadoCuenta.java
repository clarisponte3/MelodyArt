package com.sonorasync.service;

import com.sonorasync.dto.request.EstadoCuentaRequestDTO;
import com.sonorasync.dto.response.EstadoCuentaResponseDTO;
import com.sonorasync.model.EstadoCuenta;
import com.sonorasync.repository.RepositoryConceptoPago;
import com.sonorasync.repository.RepositoryEstadoCuenta;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceEstadoCuenta {

    private final RepositoryEstadoCuenta repository;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;
    private final RepositoryConceptoPago repositoryConceptoPago;
    private final ServiceConceptoPago serviceConceptoPago;

    @Transactional(readOnly = true)
    public List<EstadoCuentaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EstadoCuentaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public EstadoCuentaResponseDTO save(EstadoCuentaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
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

    @Transactional
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
