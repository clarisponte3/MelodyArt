package com.sonorasync.service;

import com.sonorasync.dto.request.ClaseMusicalRequestDTO;
import com.sonorasync.dto.response.ClaseMusicalResponseDTO;
import com.sonorasync.model.ClaseMusical;
import com.sonorasync.repository.RepositoryClaseMusical;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceClaseMusical {
    @Autowired private RepositoryClaseMusical repository;

    public List<ClaseMusicalResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public ClaseMusicalResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public ClaseMusicalResponseDTO save(ClaseMusicalRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public ClaseMusicalResponseDTO update(Long id, ClaseMusicalRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getHorario() != null) entity.setHorario(dto.getHorario());
            if (dto.getCapacidadMaxima() != null) entity.setCapacidadMaxima(dto.getCapacidadMaxima());
            if (dto.getCosto() != null) entity.setCosto(dto.getCosto());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ClaseMusicalResponseDTO toResponseDTO(ClaseMusical entity) {
        if (entity == null) return null;
        ClaseMusicalResponseDTO dto = new ClaseMusicalResponseDTO();
        dto.setIdClaseMusical(entity.getIdClaseMusical());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setHorario(entity.getHorario());
        dto.setCapacidadMaxima(entity.getCapacidadMaxima());
        dto.setCosto(entity.getCosto());
        return dto;
    }

    public ClaseMusical toEntity(ClaseMusicalRequestDTO dto) {
        if (dto == null) return null;
        ClaseMusical entity = new ClaseMusical();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getHorario() != null) entity.setHorario(dto.getHorario());
        if (dto.getCapacidadMaxima() != null) entity.setCapacidadMaxima(dto.getCapacidadMaxima());
        if (dto.getCosto() != null) entity.setCosto(dto.getCosto());
        return entity;
    }
}
