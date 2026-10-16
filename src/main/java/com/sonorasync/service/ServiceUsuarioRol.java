package com.sonorasync.service;

import com.sonorasync.dto.request.UsuarioRolRequestDTO;
import com.sonorasync.dto.response.UsuarioRolResponseDTO;
import com.sonorasync.model.UsuarioRol;
import com.sonorasync.repository.RepositoryRol;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.repository.RepositoryUsuarioRol;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceUsuarioRol {

    private final RepositoryUsuarioRol repository;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;
    private final RepositoryRol repositoryRol;
    private final ServiceRol serviceRol;

    @Transactional(readOnly = true)
    public List<UsuarioRolResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioRolResponseDTO findById(UsuarioRol.UsuarioRolId id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public UsuarioRolResponseDTO save(UsuarioRolRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public void delete(UsuarioRol.UsuarioRolId id) {
        repository.deleteById(id);
    }

    public UsuarioRolResponseDTO toResponseDTO(UsuarioRol entity) {
        if (entity == null) return null;
        UsuarioRolResponseDTO dto = new UsuarioRolResponseDTO();
        if (entity.getId() != null) dto.setIdUsuario(entity.getId().getIdUsuario());
        if (entity.getId() != null) dto.setIdRol(entity.getId().getIdRol());
        if (entity.getUsuario() != null) {
            dto.setUsuario(serviceUsuario.toResponseDTO(entity.getUsuario()));
        }
        if (entity.getRol() != null) {
            dto.setRol(serviceRol.toResponseDTO(entity.getRol()));
        }
        dto.setAsignadoEn(entity.getAsignadoEn());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public UsuarioRol toEntity(UsuarioRolRequestDTO dto) {
        if (dto == null) return null;
        UsuarioRol entity = new UsuarioRol();
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(dto.getIdUsuario());
        id.setIdRol(dto.getIdRol());
        entity.setId(id);
        if (dto.getAsignadoEn() != null) entity.setAsignadoEn(dto.getAsignadoEn());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        if (dto.getIdUsuario() != null) {
            repositoryUsuario.findById(dto.getIdUsuario()).ifPresent(entity::setUsuario);
        }
        if (dto.getIdRol() != null) {
            repositoryRol.findById(dto.getIdRol()).ifPresent(entity::setRol);
        }
        return entity;
    }
}
