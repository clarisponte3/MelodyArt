package com.sonorasync.service;

import com.sonorasync.dto.request.MarcaRequestDTO;
import com.sonorasync.dto.response.MarcaResponseDTO;
import com.sonorasync.model.Marca;
import com.sonorasync.repository.RepositoryMarca;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceMarca {
    @Autowired private RepositoryMarca repository;

    public List<MarcaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public MarcaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public MarcaResponseDTO save(MarcaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public MarcaResponseDTO update(Long id, MarcaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getActiva() != null) entity.setActiva(dto.getActiva());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public MarcaResponseDTO toResponseDTO(Marca entity) {
        if (entity == null) return null;
        MarcaResponseDTO dto = new MarcaResponseDTO();
        dto.setIdMarca(entity.getIdMarca());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setActiva(entity.getActiva());
        return dto;
    }

    public Marca toEntity(MarcaRequestDTO dto) {
        if (dto == null) return null;
        Marca entity = new Marca();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getActiva() != null) entity.setActiva(dto.getActiva());
        return entity;
    }
}
