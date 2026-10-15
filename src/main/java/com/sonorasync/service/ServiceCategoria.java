package com.sonorasync.service;

import com.sonorasync.dto.request.CategoriaRequestDTO;
import com.sonorasync.dto.response.CategoriaResponseDTO;
import com.sonorasync.model.Categoria;
import com.sonorasync.repository.RepositoryCategoria;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCategoria {
    @Autowired private RepositoryCategoria repository;

    public List<CategoriaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public CategoriaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public CategoriaResponseDTO save(CategoriaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public CategoriaResponseDTO update(Long id, CategoriaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public CategoriaResponseDTO toResponseDTO(Categoria entity) {
        if (entity == null) return null;
        CategoriaResponseDTO dto = new CategoriaResponseDTO();
        dto.setIdCategoria(entity.getIdCategoria());
        dto.setNombre(entity.getNombre());
        dto.setTipo(entity.getTipo());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public Categoria toEntity(CategoriaRequestDTO dto) {
        if (dto == null) return null;
        Categoria entity = new Categoria();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        return entity;
    }
}
