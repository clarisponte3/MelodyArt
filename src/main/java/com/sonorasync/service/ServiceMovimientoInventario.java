package com.sonorasync.service;

import com.sonorasync.dto.request.MovimientoInventarioRequestDTO;
import com.sonorasync.dto.response.MovimientoInventarioResponseDTO;
import com.sonorasync.model.MovimientoInventario;
import com.sonorasync.model.Producto;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryMovimientoInventario;
import com.sonorasync.repository.RepositoryProducto;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceProducto;
import com.sonorasync.service.ServiceUsuario;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceMovimientoInventario {
    @Autowired private RepositoryMovimientoInventario repository;
    @Autowired private RepositoryProducto repositoryProducto;
    @Autowired private ServiceProducto serviceProducto;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;

    public List<MovimientoInventarioResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public MovimientoInventarioResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public MovimientoInventarioResponseDTO save(MovimientoInventarioRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public MovimientoInventarioResponseDTO update(Long id, MovimientoInventarioRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdProducto() != null) {
                repositoryProducto.findById(dto.getIdProducto()).ifPresent(entity::setProducto);
            }
            if (dto.getIdUsuario() != null) {
                repositoryUsuario.findById(dto.getIdUsuario()).ifPresent(entity::setUsuario);
            }
            if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
            if (dto.getTipoMovimiento() != null) entity.setTipoMovimiento(dto.getTipoMovimiento());
            if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
            if (dto.getMotivo() != null) entity.setMotivo(dto.getMotivo());
            if (dto.getReferencia() != null) entity.setReferencia(dto.getReferencia());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public MovimientoInventarioResponseDTO toResponseDTO(MovimientoInventario entity) {
        if (entity == null) return null;
        MovimientoInventarioResponseDTO dto = new MovimientoInventarioResponseDTO();
        dto.setIdMovimiento(entity.getIdMovimiento());
        if (entity.getProducto() != null) {
            dto.setProducto(serviceProducto.toResponseDTO(entity.getProducto()));
        }
        if (entity.getUsuario() != null) {
            dto.setUsuario(serviceUsuario.toResponseDTO(entity.getUsuario()));
        }
        dto.setFechaHora(entity.getFechaHora());
        dto.setTipoMovimiento(entity.getTipoMovimiento());
        dto.setCantidad(entity.getCantidad());
        dto.setMotivo(entity.getMotivo());
        dto.setReferencia(entity.getReferencia());
        return dto;
    }

    public MovimientoInventario toEntity(MovimientoInventarioRequestDTO dto) {
        if (dto == null) return null;
        MovimientoInventario entity = new MovimientoInventario();
        if (dto.getIdProducto() != null) {
            repositoryProducto.findById(dto.getIdProducto()).ifPresent(entity::setProducto);
        }
        if (dto.getIdUsuario() != null) {
            repositoryUsuario.findById(dto.getIdUsuario()).ifPresent(entity::setUsuario);
        }
        if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
        if (dto.getTipoMovimiento() != null) entity.setTipoMovimiento(dto.getTipoMovimiento());
        if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
        if (dto.getMotivo() != null) entity.setMotivo(dto.getMotivo());
        if (dto.getReferencia() != null) entity.setReferencia(dto.getReferencia());
        return entity;
    }
}
