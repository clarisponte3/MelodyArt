package com.sonorasync.service;

import com.sonorasync.dto.request.MarcaRequestDTO;
import com.sonorasync.dto.response.MarcaResponseDTO;
import com.sonorasync.model.Marca;
import com.sonorasync.repository.RepositoryMarca;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceMarca {

    private final RepositoryMarca repository;

    @Transactional(readOnly = true)
    public List<MarcaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MarcaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public MarcaResponseDTO save(MarcaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public MarcaResponseDTO update(Long id, MarcaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getActiva() != null) entity.setActiva(dto.getActiva());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
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
