package com.sonorasync.service;

import com.sonorasync.dto.request.CompraRequestDTO;
import com.sonorasync.dto.response.CompraResponseDTO;
import com.sonorasync.model.Compra;
import com.sonorasync.repository.RepositoryCompra;
import com.sonorasync.repository.RepositoryProveedor;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceCompra {

    private final RepositoryCompra repository;
    private final RepositoryProveedor repositoryProveedor;
    private final ServiceProveedor serviceProveedor;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;

    @Transactional(readOnly = true)
    public List<CompraResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CompraResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public CompraResponseDTO save(CompraRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public CompraResponseDTO update(Long id, CompraRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getFolio() != null) entity.setFolio(dto.getFolio());
            if (dto.getFecha() != null) entity.setFecha(dto.getFecha());
            if (dto.getIdProveedor() != null) {
                repositoryProveedor.findById(dto.getIdProveedor()).ifPresent(entity::setProveedor);
            }
            if (dto.getIdUsuarioRegistra() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioRegistra()).ifPresent(entity::setUsuarioRegistra);
            }
            if (dto.getTasaIva() != null) entity.setTasaIva(dto.getTasaIva());
            if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public CompraResponseDTO toResponseDTO(Compra entity) {
        if (entity == null) return null;
        CompraResponseDTO dto = new CompraResponseDTO();
        dto.setIdCompra(entity.getIdCompra());
        dto.setFolio(entity.getFolio());
        dto.setFecha(entity.getFecha());
        if (entity.getProveedor() != null) {
            dto.setProveedor(serviceProveedor.toResponseDTO(entity.getProveedor()));
        }
        if (entity.getUsuarioRegistra() != null) {
            dto.setUsuarioRegistra(serviceUsuario.toResponseDTO(entity.getUsuarioRegistra()));
        }
        dto.setTasaIva(entity.getTasaIva());
        dto.setObservaciones(entity.getObservaciones());
        return dto;
    }

    public Compra toEntity(CompraRequestDTO dto) {
        if (dto == null) return null;
        Compra entity = new Compra();
        if (dto.getFolio() != null) entity.setFolio(dto.getFolio());
        if (dto.getFecha() != null) entity.setFecha(dto.getFecha());
        if (dto.getIdProveedor() != null) {
            repositoryProveedor.findById(dto.getIdProveedor()).ifPresent(entity::setProveedor);
        }
        if (dto.getIdUsuarioRegistra() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioRegistra()).ifPresent(entity::setUsuarioRegistra);
        }
        if (dto.getTasaIva() != null) entity.setTasaIva(dto.getTasaIva());
        if (dto.getObservaciones() != null) entity.setObservaciones(dto.getObservaciones());
        return entity;
    }
}
