package com.sonorasync.service;

import com.sonorasync.dto.request.CompraRequestDTO;
import com.sonorasync.dto.response.CompraResponseDTO;
import com.sonorasync.model.Compra;
import com.sonorasync.model.Proveedor;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryCompra;
import com.sonorasync.repository.RepositoryProveedor;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceProveedor;
import com.sonorasync.service.ServiceUsuario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCompra {
    @Autowired private RepositoryCompra repository;
    @Autowired private RepositoryProveedor repositoryProveedor;
    @Autowired private ServiceProveedor serviceProveedor;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;

    public List<CompraResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public CompraResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public CompraResponseDTO save(CompraRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

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
