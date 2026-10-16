package com.sonorasync.service;

import com.sonorasync.dto.request.EvaluacionRequestDTO;
import com.sonorasync.dto.response.EvaluacionResponseDTO;
import com.sonorasync.model.Evaluacion;
import com.sonorasync.repository.RepositoryEvaluacion;
import com.sonorasync.repository.RepositoryInscripcion;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceEvaluacion {

    private final RepositoryEvaluacion repository;
    private final RepositoryInscripcion repositoryInscripcion;
    private final ServiceInscripcion serviceInscripcion;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;

    @Transactional(readOnly = true)
    public List<EvaluacionResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EvaluacionResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public EvaluacionResponseDTO save(EvaluacionRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public EvaluacionResponseDTO update(Long id, EvaluacionRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdInscripcion() != null) {
                repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
            }
            if (dto.getIdProfesor() != null) {
                repositoryUsuario.findById(dto.getIdProfesor()).ifPresent(entity::setProfesor);
            }
            if (dto.getFechaEvaluacion() != null) entity.setFechaEvaluacion(dto.getFechaEvaluacion());
            if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
            if (dto.getCalificacion() != null) entity.setCalificacion(dto.getCalificacion());
            if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public EvaluacionResponseDTO toResponseDTO(Evaluacion entity) {
        if (entity == null) return null;
        EvaluacionResponseDTO dto = new EvaluacionResponseDTO();
        dto.setIdEvaluacion(entity.getIdEvaluacion());
        if (entity.getInscripcion() != null) {
            dto.setInscripcion(serviceInscripcion.toResponseDTO(entity.getInscripcion()));
        }
        if (entity.getProfesor() != null) {
            dto.setProfesor(serviceUsuario.toResponseDTO(entity.getProfesor()));
        }
        dto.setFechaEvaluacion(entity.getFechaEvaluacion());
        dto.setTipo(entity.getTipo());
        dto.setCalificacion(entity.getCalificacion());
        dto.setObservaciones(entity.getObservaciones());
        return dto;
    }

    public Evaluacion toEntity(EvaluacionRequestDTO dto) {
        if (dto == null) return null;
        Evaluacion entity = new Evaluacion();
        if (dto.getIdInscripcion() != null) {
            repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
        }
        if (dto.getIdProfesor() != null) {
            repositoryUsuario.findById(dto.getIdProfesor()).ifPresent(entity::setProfesor);
        }
        if (dto.getFechaEvaluacion() != null) entity.setFechaEvaluacion(dto.getFechaEvaluacion());
        if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
        if (dto.getCalificacion() != null) entity.setCalificacion(dto.getCalificacion());
        if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
        return entity;
    }
}
