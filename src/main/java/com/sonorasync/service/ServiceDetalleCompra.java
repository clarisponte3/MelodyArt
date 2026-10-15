package com.sonorasync.service;

import com.sonorasync.dto.request.DetalleCompraRequestDTO;
import com.sonorasync.dto.response.DetalleCompraResponseDTO;
import com.sonorasync.model.Compra;
import com.sonorasync.model.DetalleCompra;
import com.sonorasync.model.Producto;
import com.sonorasync.repository.RepositoryCompra;
import com.sonorasync.repository.RepositoryDetalleCompra;
import com.sonorasync.repository.RepositoryProducto;
import com.sonorasync.service.ServiceProducto;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceDetalleCompra {
    @Autowired private RepositoryDetalleCompra repository;
    @Autowired private RepositoryCompra repositoryCompra;
    @Autowired private RepositoryProducto repositoryProducto;
    @Autowired private ServiceProducto serviceProducto;

    public List<DetalleCompraResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public DetalleCompraResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public DetalleCompraResponseDTO save(DetalleCompraRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public DetalleCompraResponseDTO update(Long id, DetalleCompraRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdCompra() != null) {
                repositoryCompra.findById(dto.getIdCompra()).ifPresent(entity::setCompra);
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

    public DetalleCompraResponseDTO toResponseDTO(DetalleCompra entity) {
        if (entity == null) return null;
        DetalleCompraResponseDTO dto = new DetalleCompraResponseDTO();
        dto.setIdDetalleCompra(entity.getIdDetalleCompra());
        if (entity.getCompra() != null) {
            dto.setIdCompra(entity.getCompra().getIdCompra());
        }
        if (entity.getProducto() != null) {
            dto.setProducto(serviceProducto.toResponseDTO(entity.getProducto()));
        }
        dto.setCantidad(entity.getCantidad());
        dto.setPrecioUnitario(entity.getPrecioUnitario());
        return dto;
    }

    public DetalleCompra toEntity(DetalleCompraRequestDTO dto) {
        if (dto == null) return null;
        DetalleCompra entity = new DetalleCompra();
        if (dto.getIdCompra() != null) {
            repositoryCompra.findById(dto.getIdCompra()).ifPresent(entity::setCompra);
        }
        if (dto.getIdProducto() != null) {
            repositoryProducto.findById(dto.getIdProducto()).ifPresent(entity::setProducto);
        }
        if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
        if (dto.getPrecioUnitario() != null) entity.setPrecioUnitario(dto.getPrecioUnitario());
        return entity;
    }
}
