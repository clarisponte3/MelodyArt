package com.sonorasync.service;

import com.sonorasync.dto.request.EvaluacionRequestDTO;
import com.sonorasync.dto.response.EvaluacionResponseDTO;
import com.sonorasync.model.Evaluacion;
import com.sonorasync.model.Inscripcion;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryEvaluacion;
import com.sonorasync.repository.RepositoryInscripcion;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceInscripcion;
import com.sonorasync.service.ServiceUsuario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEvaluacion {
    @Autowired private RepositoryEvaluacion repository;
    @Autowired private RepositoryInscripcion repositoryInscripcion;
    @Autowired private ServiceInscripcion serviceInscripcion;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;

    public List<EvaluacionResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public EvaluacionResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public EvaluacionResponseDTO save(EvaluacionRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

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
