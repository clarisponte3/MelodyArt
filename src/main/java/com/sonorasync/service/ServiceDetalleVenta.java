package com.sonorasync.service;

import com.sonorasync.dto.request.DetalleVentaRequestDTO;
import com.sonorasync.dto.response.DetalleVentaResponseDTO;
import com.sonorasync.model.DetalleVenta;
import com.sonorasync.model.Producto;
import com.sonorasync.model.Venta;
import com.sonorasync.repository.RepositoryDetalleVenta;
import com.sonorasync.repository.RepositoryProducto;
import com.sonorasync.repository.RepositoryVenta;
import com.sonorasync.service.ServiceProducto;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceDetalleVenta {
    @Autowired private RepositoryDetalleVenta repository;
    @Autowired private RepositoryVenta repositoryVenta;
    @Autowired private RepositoryProducto repositoryProducto;
    @Autowired private ServiceProducto serviceProducto;

    public List<DetalleVentaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public DetalleVentaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public DetalleVentaResponseDTO save(DetalleVentaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public DetalleVentaResponseDTO update(Long id, DetalleVentaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdVenta() != null) {
                repositoryVenta.findById(dto.getIdVenta()).ifPresent(entity::setVenta);
            }
            if (dto.getIdProducto() != null) {
                repositoryProducto.findById(dto.getIdProducto()).ifPresent(entity::setProducto);
            }
            if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
            if (dto.getPrecioUnitario() != null) entity.setPrecioUnitario(dto.getPrecioUnitario());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public DetalleVentaResponseDTO toResponseDTO(DetalleVenta entity) {
        if (entity == null) return null;
        DetalleVentaResponseDTO dto = new DetalleVentaResponseDTO();
        dto.setIdDetalleVenta(entity.getIdDetalleVenta());
        if (entity.getVenta() != null) {
            dto.setIdVenta(entity.getVenta().getIdVenta());
        }
        if (entity.getProducto() != null) {
            dto.setProducto(serviceProducto.toResponseDTO(entity.getProducto()));
        }
        dto.setCantidad(entity.getCantidad());
        dto.setPrecioUnitario(entity.getPrecioUnitario());
        return dto;
    }

    public DetalleVenta toEntity(DetalleVentaRequestDTO dto) {
        if (dto == null) return null;
        DetalleVenta entity = new DetalleVenta();
        if (dto.getIdVenta() != null) {
            repositoryVenta.findById(dto.getIdVenta()).ifPresent(entity::setVenta);
        }
        if (dto.getIdProducto() != null) {
            repositoryProducto.findById(dto.getIdProducto()).ifPresent(entity::setProducto);
        }
        if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
        if (dto.getPrecioUnitario() != null) entity.setPrecioUnitario(dto.getPrecioUnitario());
        return entity;
    }
}
