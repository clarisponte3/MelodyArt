package com.sonorasync.service;

import com.sonorasync.dto.request.ProveedorRequestDTO;
import com.sonorasync.dto.response.ProveedorResponseDTO;
import com.sonorasync.model.Proveedor;
import com.sonorasync.repository.RepositoryProveedor;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceProveedor {
    @Autowired private RepositoryProveedor repository;

    public List<ProveedorResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public ProveedorResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public ProveedorResponseDTO save(ProveedorRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public ProveedorResponseDTO update(Long id, ProveedorRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getEmpresa() != null) entity.setEmpresa(dto.getEmpresa());
            if (dto.getRfc() != null) entity.setRfc(dto.getRfc());
            if (dto.getTel() != null) entity.setTel(dto.getTel());
            if (dto.getCorreo() != null) entity.setCorreo(dto.getCorreo());
            if (dto.getDireccion() != null) entity.setDireccion(dto.getDireccion());
            if (dto.getCondicionesPago() != null) entity.setCondicionesPago(dto.getCondicionesPago());
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ProveedorResponseDTO toResponseDTO(Proveedor entity) {
        if (entity == null) return null;
        ProveedorResponseDTO dto = new ProveedorResponseDTO();
        dto.setIdProveedor(entity.getIdProveedor());
        dto.setEmpresa(entity.getEmpresa());
        dto.setRfc(entity.getRfc());
        dto.setTel(entity.getTel());
        dto.setCorreo(entity.getCorreo());
        dto.setDireccion(entity.getDireccion());
        dto.setCondicionesPago(entity.getCondicionesPago());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public Proveedor toEntity(ProveedorRequestDTO dto) {
        if (dto == null) return null;
        Proveedor entity = new Proveedor();
        if (dto.getEmpresa() != null) entity.setEmpresa(dto.getEmpresa());
        if (dto.getRfc() != null) entity.setRfc(dto.getRfc());
        if (dto.getTel() != null) entity.setTel(dto.getTel());
        if (dto.getCorreo() != null) entity.setCorreo(dto.getCorreo());
        if (dto.getDireccion() != null) entity.setDireccion(dto.getDireccion());
        if (dto.getCondicionesPago() != null) entity.setCondicionesPago(dto.getCondicionesPago());
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        return entity;
    }
}
