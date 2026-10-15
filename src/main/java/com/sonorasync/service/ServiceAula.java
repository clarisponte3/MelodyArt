package com.sonorasync.service;

import com.sonorasync.dto.request.AulaRequestDTO;
import com.sonorasync.dto.response.AulaResponseDTO;
import com.sonorasync.model.Aula;
import com.sonorasync.repository.RepositoryAula;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceAula {
    @Autowired private RepositoryAula repository;

    public List<AulaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public AulaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public AulaResponseDTO save(AulaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public AulaResponseDTO update(Long id, AulaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getCapacidad() != null) entity.setCapacidad(dto.getCapacidad());
            if (dto.getUbicacion() != null) entity.setUbicacion(dto.getUbicacion());
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public AulaResponseDTO toResponseDTO(Aula entity) {
        if (entity == null) return null;
        AulaResponseDTO dto = new AulaResponseDTO();
        dto.setIdAula(entity.getIdAula());
        dto.setNombre(entity.getNombre());
        dto.setCapacidad(entity.getCapacidad());
        dto.setUbicacion(entity.getUbicacion());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public Aula toEntity(AulaRequestDTO dto) {
        if (dto == null) return null;
        Aula entity = new Aula();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getCapacidad() != null) entity.setCapacidad(dto.getCapacidad());
        if (dto.getUbicacion() != null) entity.setUbicacion(dto.getUbicacion());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
