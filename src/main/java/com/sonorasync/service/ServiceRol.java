package com.sonorasync.service;

import com.sonorasync.dto.request.RolRequestDTO;
import com.sonorasync.dto.response.RolResponseDTO;
import com.sonorasync.model.Rol;
import com.sonorasync.repository.RepositoryRol;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceRol {
    @Autowired private RepositoryRol repository;

    public List<RolResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public RolResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public RolResponseDTO save(RolRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public RolResponseDTO update(Long id, RolRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public RolResponseDTO toResponseDTO(Rol entity) {
        if (entity == null) return null;
        RolResponseDTO dto = new RolResponseDTO();
        dto.setIdRol(entity.getIdRol());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public Rol toEntity(RolRequestDTO dto) {
        if (dto == null) return null;
        Rol entity = new Rol();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
