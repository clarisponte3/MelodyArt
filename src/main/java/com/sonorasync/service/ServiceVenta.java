package com.sonorasync.service;

import com.sonorasync.dto.request.VentaRequestDTO;
import com.sonorasync.dto.response.VentaResponseDTO;
import com.sonorasync.model.Venta;
import com.sonorasync.repository.RepositoryMetodoPago;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.repository.RepositoryVenta;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class ServiceVenta {

    private final RepositoryVenta repository;
    private final RepositoryUsuario repositoryUsuario;
    private final ServiceUsuario serviceUsuario;
    private final RepositoryMetodoPago repositoryMetodoPago;
    private final ServiceMetodoPago serviceMetodoPago;

    @Transactional(readOnly = true)
    public Page<VentaResponseDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(this::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public VentaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public VentaResponseDTO save(VentaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public VentaResponseDTO update(Long id, VentaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getFolio() != null) entity.setFolio(dto.getFolio());
            if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
            if (dto.getIdUsuarioVendedor() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioVendedor()).ifPresent(entity::setVendedor);
            }
            if (dto.getIdUsuarioCliente() != null) {
                repositoryUsuario.findById(dto.getIdUsuarioCliente()).ifPresent(entity::setCliente);
            }
            if (dto.getIdMetodoPago() != null) {
                repositoryMetodoPago.findById(dto.getIdMetodoPago()).ifPresent(entity::setMetodoPago);
            }
            if (dto.getTasaIva() != null) entity.setTasaIva(dto.getTasaIva());
            if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public VentaResponseDTO toResponseDTO(Venta entity) {
        if (entity == null) return null;
        VentaResponseDTO dto = new VentaResponseDTO();
        dto.setIdVenta(entity.getIdVenta());
        dto.setFolio(entity.getFolio());
        dto.setFechaHora(entity.getFechaHora());
        if (entity.getVendedor() != null) {
            dto.setVendedor(serviceUsuario.toResponseDTO(entity.getVendedor()));
        }
        if (entity.getCliente() != null) {
            dto.setCliente(serviceUsuario.toResponseDTO(entity.getCliente()));
        }
        if (entity.getMetodoPago() != null) {
            dto.setMetodoPago(serviceMetodoPago.toResponseDTO(entity.getMetodoPago()));
        }
        dto.setTasaIva(entity.getTasaIva());
        dto.setEstado(entity.getEstado());
        return dto;
    }

    public Venta toEntity(VentaRequestDTO dto) {
        if (dto == null) return null;
        Venta entity = new Venta();
        if (dto.getFolio() != null) entity.setFolio(dto.getFolio());
        if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
        if (dto.getIdUsuarioVendedor() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioVendedor()).ifPresent(entity::setVendedor);
        }
        if (dto.getIdUsuarioCliente() != null) {
            repositoryUsuario.findById(dto.getIdUsuarioCliente()).ifPresent(entity::setCliente);
        }
        if (dto.getIdMetodoPago() != null) {
            repositoryMetodoPago.findById(dto.getIdMetodoPago()).ifPresent(entity::setMetodoPago);
        }
        if (dto.getTasaIva() != null) entity.setTasaIva(dto.getTasaIva());
        if (dto.getEstado() != null) entity.setEstado(dto.getEstado());
        return entity;
    }
}
