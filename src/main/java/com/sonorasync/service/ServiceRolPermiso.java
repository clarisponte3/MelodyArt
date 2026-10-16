package com.sonorasync.service;

import com.sonorasync.dto.request.RolPermisoRequestDTO;
import com.sonorasync.dto.response.RolPermisoResponseDTO;
import com.sonorasync.model.RolPermiso;
import com.sonorasync.repository.RepositoryPermiso;
import com.sonorasync.repository.RepositoryRol;
import com.sonorasync.repository.RepositoryRolPermiso;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceRolPermiso {

    private final RepositoryRolPermiso repository;
    private final RepositoryRol repositoryRol;
    private final ServiceRol serviceRol;
    private final RepositoryPermiso repositoryPermiso;
    private final ServicePermiso servicePermiso;

    @Transactional(readOnly = true)
    public List<RolPermisoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RolPermisoResponseDTO findById(RolPermiso.RolPermisoId id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public RolPermisoResponseDTO save(RolPermisoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public void delete(RolPermiso.RolPermisoId id) {
        repository.deleteById(id);
    }

    public RolPermisoResponseDTO toResponseDTO(RolPermiso entity) {
        if (entity == null) return null;
        RolPermisoResponseDTO dto = new RolPermisoResponseDTO();
        if (entity.getId() != null) dto.setIdRol(entity.getId().getIdRol());
        if (entity.getId() != null) dto.setIdPermiso(entity.getId().getIdPermiso());
        if (entity.getRol() != null) {
            dto.setRol(serviceRol.toResponseDTO(entity.getRol()));
        }
        if (entity.getPermiso() != null) {
            dto.setPermiso(servicePermiso.toResponseDTO(entity.getPermiso()));
        }
        return dto;
    }

    public RolPermiso toEntity(RolPermisoRequestDTO dto) {
        if (dto == null) return null;
        RolPermiso entity = new RolPermiso();
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(dto.getIdRol());
        id.setIdPermiso(dto.getIdPermiso());
        entity.setId(id);
        if (dto.getIdRol() != null) {
            repositoryRol.findById(dto.getIdRol()).ifPresent(entity::setRol);
        }
        if (dto.getIdPermiso() != null) {
            repositoryPermiso.findById(dto.getIdPermiso()).ifPresent(entity::setPermiso);
        }
        return entity;
    }
}
