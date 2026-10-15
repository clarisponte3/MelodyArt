package com.sonorasync.service;

import com.sonorasync.dto.request.AsistenciaClaseRequestDTO;
import com.sonorasync.dto.response.AsistenciaClaseResponseDTO;
import com.sonorasync.model.AsistenciaClase;
import com.sonorasync.model.Inscripcion;
import com.sonorasync.repository.RepositoryAsistenciaClase;
import com.sonorasync.repository.RepositoryInscripcion;
import com.sonorasync.service.ServiceInscripcion;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceAsistenciaClase {
    @Autowired private RepositoryAsistenciaClase repository;
    @Autowired private RepositoryInscripcion repositoryInscripcion;
    @Autowired private ServiceInscripcion serviceInscripcion;

    public List<AsistenciaClaseResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public AsistenciaClaseResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public AsistenciaClaseResponseDTO save(AsistenciaClaseRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public AsistenciaClaseResponseDTO update(Long id, AsistenciaClaseRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdInscripcion() != null) {
                repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
            }
            if (dto.getFechaClase() != null) entity.setFechaClase(dto.getFechaClase());
            if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
            if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public AsistenciaClaseResponseDTO toResponseDTO(AsistenciaClase entity) {
        if (entity == null) return null;
        AsistenciaClaseResponseDTO dto = new AsistenciaClaseResponseDTO();
        dto.setIdAsistencia(entity.getIdAsistencia());
        if (entity.getInscripcion() != null) {
            dto.setInscripcion(serviceInscripcion.toResponseDTO(entity.getInscripcion()));
        }
        dto.setFechaClase(entity.getFechaClase());
        dto.setEstado(entity.getEstado());
        dto.setObservaciones(entity.getObservaciones());
        dto.setRegistradaEn(entity.getRegistradaEn());
        return dto;
    }

    public AsistenciaClase toEntity(AsistenciaClaseRequestDTO dto) {
        if (dto == null) return null;
        AsistenciaClase entity = new AsistenciaClase();
        if (dto.getIdInscripcion() != null) {
            repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
        }
        if (dto.getFechaClase() != null) entity.setFechaClase(dto.getFechaClase());
        if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
        if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
        return entity;
    }
}
