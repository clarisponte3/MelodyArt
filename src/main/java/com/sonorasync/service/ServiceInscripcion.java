package com.sonorasync.service;

import com.sonorasync.dto.request.InscripcionRequestDTO;
import com.sonorasync.dto.response.InscripcionResponseDTO;
import com.sonorasync.model.Inscripcion;
import com.sonorasync.repository.RepositoryClaseMusical;
import com.sonorasync.repository.RepositoryInscripcion;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceInscripcion {

    private final RepositoryInscripcion repository;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;
    private final RepositoryClaseMusical repositoryClaseMusical;
    private final ServiceClaseMusical serviceClaseMusical;

    @Transactional(readOnly = true)
    public List<InscripcionResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InscripcionResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public InscripcionResponseDTO save(InscripcionRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public InscripcionResponseDTO update(Long id, InscripcionRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdUsuarioAlumno() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioAlumno()).ifPresent(entity::setAlumno);
            }
            if (dto.getIdClase() != null) {
                repositoryClaseMusical.findById(dto.getIdClase()).ifPresent(entity::setClase);
            }
            if (dto.getFechaInscripcion() != null) entity.setFechaInscripcion(dto.getFechaInscripcion());
            if (dto.getFechaBaja() != null) entity.setFechaBaja(dto.getFechaBaja());
            if (dto.getCostoAcordado() != null) entity.setCostoAcordado(dto.getCostoAcordado());
            if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public InscripcionResponseDTO toResponseDTO(Inscripcion entity) {
        if (entity == null) return null;
        InscripcionResponseDTO dto = new InscripcionResponseDTO();
        dto.setIdInscripcion(entity.getIdInscripcion());
        if (entity.getAlumno() != null) {
            dto.setAlumno(serviceUsuario.toResponseDTO(entity.getAlumno()));
        }
        if (entity.getClase() != null) {
            dto.setClase(serviceClaseMusical.toResponseDTO(entity.getClase()));
        }
        dto.setFechaInscripcion(entity.getFechaInscripcion());
        dto.setFechaBaja(entity.getFechaBaja());
        dto.setCostoAcordado(entity.getCostoAcordado());
        dto.setEstado(entity.getEstado());
        return dto;
    }

    public Inscripcion toEntity(InscripcionRequestDTO dto) {
        if (dto == null) return null;
        Inscripcion entity = new Inscripcion();
        if (dto.getIdUsuarioAlumno() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioAlumno()).ifPresent(entity::setAlumno);
        }
        if (dto.getIdClase() != null) {
            repositoryClaseMusical.findById(dto.getIdClase()).ifPresent(entity::setClase);
        }
        if (dto.getFechaInscripcion() != null) entity.setFechaInscripcion(dto.getFechaInscripcion());
        if (dto.getFechaBaja() != null) entity.setFechaBaja(dto.getFechaBaja());
        if (dto.getCostoAcordado() != null) entity.setCostoAcordado(dto.getCostoAcordado());
        if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
        return entity;
    }
}
