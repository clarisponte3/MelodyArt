package com.sonorasync.service;

import com.sonorasync.dto.request.BitacoraProgresoRequestDTO;
import com.sonorasync.dto.response.BitacoraProgresoResponseDTO;
import com.sonorasync.model.BitacoraProgreso;
import com.sonorasync.repository.RepositoryBitacoraProgreso;
import com.sonorasync.repository.RepositoryInscripcion;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceBitacoraProgreso {

    private final RepositoryBitacoraProgreso repository;
    private final RepositoryInscripcion repositoryInscripcion;
    private final ServiceInscripcion serviceInscripcion;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;

    @Transactional(readOnly = true)
    public List<BitacoraProgresoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BitacoraProgresoResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public BitacoraProgresoResponseDTO save(BitacoraProgresoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public BitacoraProgresoResponseDTO update(Long id, BitacoraProgresoRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdInscripcion() != null) {
                repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
            }
            if (dto.getIdProfesor() != null) {
                repositoryUsuario.findById(dto.getIdProfesor()).ifPresent(entity::setProfesor);
            }
            if (dto.getFechaSesion() != null) entity.setFechaSesion(dto.getFechaSesion());
            if (dto.getTemaTrabajado() != null) entity.setTemaTrabajado(dto.getTemaTrabajado());
            if (dto.getComentariosPedagogicos() != null) entity.setComentariosPedagogicos(dto.getComentariosPedagogicos());
            if (dto.getObjetivosCumplidos() != null) entity.setObjetivosCumplidos(dto.getObjetivosCumplidos());
            if (dto.getProximaMeta() != null) entity.setProximaMeta(dto.getProximaMeta());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public BitacoraProgresoResponseDTO toResponseDTO(BitacoraProgreso entity) {
        if (entity == null) return null;
        BitacoraProgresoResponseDTO dto = new BitacoraProgresoResponseDTO();
        dto.setIdBitacora(entity.getIdBitacora());
        if (entity.getInscripcion() != null) {
            dto.setInscripcion(serviceInscripcion.toResponseDTO(entity.getInscripcion()));
        }
        if (entity.getProfesor() != null) {
            dto.setProfesor(serviceUsuario.toResponseDTO(entity.getProfesor()));
        }
        dto.setFechaSesion(entity.getFechaSesion());
        dto.setTemaTrabajado(entity.getTemaTrabajado());
        dto.setComentariosPedagogicos(entity.getComentariosPedagogicos());
        dto.setObjetivosCumplidos(entity.getObjetivosCumplidos());
        dto.setProximaMeta(entity.getProximaMeta());
        return dto;
    }

    public BitacoraProgreso toEntity(BitacoraProgresoRequestDTO dto) {
        if (dto == null) return null;
        BitacoraProgreso entity = new BitacoraProgreso();
        if (dto.getIdInscripcion() != null) {
            repositoryInscripcion.findById(dto.getIdInscripcion()).ifPresent(entity::setInscripcion);
        }
        if (dto.getIdProfesor() != null) {
            repositoryUsuario.findById(dto.getIdProfesor()).ifPresent(entity::setProfesor);
        }
        if (dto.getFechaSesion() != null) entity.setFechaSesion(dto.getFechaSesion());
        if (dto.getTemaTrabajado() != null) entity.setTemaTrabajado(dto.getTemaTrabajado());
        if (dto.getComentariosPedagogicos() != null) entity.setComentariosPedagogicos(dto.getComentariosPedagogicos());
        if (dto.getObjetivosCumplidos() != null) entity.setObjetivosCumplidos(dto.getObjetivosCumplidos());
        if (dto.getProximaMeta() != null) entity.setProximaMeta(dto.getProximaMeta());
        return entity;
    }
}
