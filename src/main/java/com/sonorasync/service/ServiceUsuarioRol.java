package com.sonorasync.service;

import com.sonorasync.dto.request.UsuarioRolRequestDTO;
import com.sonorasync.dto.response.UsuarioRolResponseDTO;
import com.sonorasync.model.Rol;
import com.sonorasync.model.Usuario;
import com.sonorasync.model.UsuarioRol;
import com.sonorasync.repository.RepositoryRol;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.repository.RepositoryUsuarioRol;
import com.sonorasync.service.ServiceRol;
import com.sonorasync.service.ServiceUsuario;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceUsuarioRol {
    @Autowired private RepositoryUsuarioRol repository;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;
    @Autowired private RepositoryRol repositoryRol;
    @Autowired private ServiceRol serviceRol;

    public List<UsuarioRolResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public UsuarioRolResponseDTO findById(UsuarioRol.UsuarioRolId id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public UsuarioRolResponseDTO save(UsuarioRolRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

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
