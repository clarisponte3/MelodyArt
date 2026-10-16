package com.sonorasync.service;

import com.sonorasync.dto.request.ProductoRequestDTO;
import com.sonorasync.dto.response.ProductoResponseDTO;
import com.sonorasync.model.Producto;
import com.sonorasync.repository.RepositoryCategoria;
import com.sonorasync.repository.RepositoryMarca;
import com.sonorasync.repository.RepositoryProducto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceProducto {

    private final RepositoryProducto repository;
    private final RepositoryCategoria repositoryCategoria;
    private final ServiceCategoria serviceCategoria;
    private final RepositoryMarca repositoryMarca;
    private final ServiceMarca serviceMarca;

    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductoResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public ProductoResponseDTO save(ProductoRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public ProductoResponseDTO update(Long id, ProductoRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getSku() != null) entity.setSku(dto.getSku());
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
            if (dto.getModelo() != null) entity.setModelo(dto.getModelo());
            if (dto.getNumeroSerie() != null) entity.setNumeroSerie(dto.getNumeroSerie());
            if (dto.getPrecioVenta() != null) entity.setPrecioVenta(dto.getPrecioVenta());
            if (dto.getStock() != null) entity.setStock(dto.getStock());
            if (dto.getStockMinimo() != null) entity.setStockMinimo(dto.getStockMinimo());
            if (dto.getIdCategoria() != null) {
                repositoryCategoria.findById(dto.getIdCategoria()).ifPresent(entity::setCategoria);
            }
            if (dto.getIdMarca() != null) {
                repositoryMarca.findById(dto.getIdMarca()).ifPresent(entity::setMarca);
            }
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ProductoResponseDTO toResponseDTO(Producto entity) {
        if (entity == null) return null;
        ProductoResponseDTO dto = new ProductoResponseDTO();
        dto.setIdProducto(entity.getIdProducto());
        dto.setSku(entity.getSku());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setModelo(entity.getModelo());
        dto.setNumeroSerie(entity.getNumeroSerie());
        dto.setPrecioVenta(entity.getPrecioVenta());
        dto.setStock(entity.getStock());
        dto.setStockMinimo(entity.getStockMinimo());
        if (entity.getCategoria() != null) {
            dto.setCategoria(serviceCategoria.toResponseDTO(entity.getCategoria()));
        }
        if (entity.getMarca() != null) {
            dto.setMarca(serviceMarca.toResponseDTO(entity.getMarca()));
        }
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public Producto toEntity(ProductoRequestDTO dto) {
        if (dto == null) return null;
        Producto entity = new Producto();
        if (dto.getSku() != null) entity.setSku(dto.getSku());
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) entity.setDescripcion(dto.getDescripcion());
        if (dto.getModelo() != null) entity.setModelo(dto.getModelo());
        if (dto.getNumeroSerie() != null) entity.setNumeroSerie(dto.getNumeroSerie());
        if (dto.getPrecioVenta() != null) entity.setPrecioVenta(dto.getPrecioVenta());
        if (dto.getStock() != null) entity.setStock(dto.getStock());
        if (dto.getStockMinimo() != null) entity.setStockMinimo(dto.getStockMinimo());
        if (dto.getIdCategoria() != null) {
            repositoryCategoria.findById(dto.getIdCategoria()).ifPresent(entity::setCategoria);
        }
        if (dto.getIdMarca() != null) {
            repositoryMarca.findById(dto.getIdMarca()).ifPresent(entity::setMarca);
        }
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
