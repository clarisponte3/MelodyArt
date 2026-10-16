package com.sonorasync.service;

import com.sonorasync.dto.request.MetodoPagoRequestDTO;
import com.sonorasync.dto.response.MetodoPagoResponseDTO;
import com.sonorasync.model.MetodoPago;
import com.sonorasync.repository.RepositoryMetodoPago;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceMetodoPago {

    private final RepositoryMetodoPago repository;

    @Transactional(readOnly = true)
    public List<MetodoPagoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MetodoPagoResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public MetodoPagoResponseDTO save(MetodoPagoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public MetodoPagoResponseDTO update(Long id, MetodoPagoRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public MetodoPagoResponseDTO toResponseDTO(MetodoPago entity) {
        if (entity == null) return null;
        MetodoPagoResponseDTO dto = new MetodoPagoResponseDTO();
        dto.setIdMetodoPago(entity.getIdMetodoPago());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public MetodoPago toEntity(MetodoPagoRequestDTO dto) {
        if (dto == null) return null;
        MetodoPago entity = new MetodoPago();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
