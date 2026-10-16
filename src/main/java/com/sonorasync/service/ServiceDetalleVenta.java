package com.sonorasync.service;

import com.sonorasync.dto.request.DetalleVentaRequestDTO;
import com.sonorasync.dto.response.DetalleVentaResponseDTO;
import com.sonorasync.model.DetalleVenta;
import com.sonorasync.repository.RepositoryDetalleVenta;
import com.sonorasync.repository.RepositoryProducto;
import com.sonorasync.repository.RepositoryVenta;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceDetalleVenta {

    private final RepositoryDetalleVenta repository;
    private final RepositoryVenta repositoryVenta;
    private final RepositoryProducto repositoryProducto;
    private final ServiceProducto serviceProducto;

    @Transactional(readOnly = true)
    public List<DetalleVentaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DetalleVentaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public DetalleVentaResponseDTO save(DetalleVentaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
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

    @Transactional
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
