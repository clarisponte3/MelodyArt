package com.sonorasync.service;

import com.sonorasync.dto.request.DetalleCompraRequestDTO;
import com.sonorasync.dto.response.DetalleCompraResponseDTO;
import com.sonorasync.model.DetalleCompra;
import com.sonorasync.repository.RepositoryCompra;
import com.sonorasync.repository.RepositoryDetalleCompra;
import com.sonorasync.repository.RepositoryProducto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceDetalleCompra {

    private final RepositoryDetalleCompra repository;
    private final RepositoryCompra repositoryCompra;
    private final RepositoryProducto repositoryProducto;
    private final ServiceProducto serviceProducto;

    @Transactional(readOnly = true)
    public List<DetalleCompraResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DetalleCompraResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public DetalleCompraResponseDTO save(DetalleCompraRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
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

    @Transactional
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
