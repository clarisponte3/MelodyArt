package com.sonorasync.service;

import com.sonorasync.dto.request.PermisoRequestDTO;
import com.sonorasync.dto.response.PermisoResponseDTO;
import com.sonorasync.model.Permiso;
import com.sonorasync.repository.RepositoryPermiso;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicePermiso {

    private final RepositoryPermiso repository;

    @Transactional(readOnly = true)
    public List<PermisoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PermisoResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public PermisoResponseDTO save(PermisoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public PermisoResponseDTO update(Long id, PermisoRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getCodigo() != null) entity.setCodigo(dto.getCodigo());
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getModulo() != null) entity.setModulo(dto.getModulo());
            if (dto.getAccion() != null) entity.setAccion(dto.getAccion());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PermisoResponseDTO toResponseDTO(Permiso entity) {
        if (entity == null) return null;
        PermisoResponseDTO dto = new PermisoResponseDTO();
        dto.setIdPermiso(entity.getIdPermiso());
        dto.setCodigo(entity.getCodigo());
        dto.setNombre(entity.getNombre());
        dto.setModulo(entity.getModulo());
        dto.setAccion(entity.getAccion());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public Permiso toEntity(PermisoRequestDTO dto) {
        if (dto == null) return null;
        Permiso entity = new Permiso();
        if (dto.getCodigo() != null) entity.setCodigo(dto.getCodigo());
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getModulo() != null) entity.setModulo(dto.getModulo());
        if (dto.getAccion() != null) entity.setAccion(dto.getAccion());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        return entity;
    }
}
