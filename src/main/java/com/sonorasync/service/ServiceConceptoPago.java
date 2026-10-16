package com.sonorasync.service;

import com.sonorasync.dto.request.ConceptoPagoRequestDTO;
import com.sonorasync.dto.response.ConceptoPagoResponseDTO;
import com.sonorasync.model.ConceptoPago;
import com.sonorasync.repository.RepositoryConceptoPago;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceConceptoPago {

    private final RepositoryConceptoPago repository;

    @Transactional(readOnly = true)
    public List<ConceptoPagoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ConceptoPagoResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public ConceptoPagoResponseDTO save(ConceptoPagoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public ConceptoPagoResponseDTO update(Long id, ConceptoPagoRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ConceptoPagoResponseDTO toResponseDTO(ConceptoPago entity) {
        if (entity == null) return null;
        ConceptoPagoResponseDTO dto = new ConceptoPagoResponseDTO();
        dto.setIdConceptoPago(entity.getIdConceptoPago());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setTipo(entity.getTipo());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public ConceptoPago toEntity(ConceptoPagoRequestDTO dto) {
        if (dto == null) return null;
        ConceptoPago entity = new ConceptoPago();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getTipo() != null) entity.setTipo(dto.getTipo());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
