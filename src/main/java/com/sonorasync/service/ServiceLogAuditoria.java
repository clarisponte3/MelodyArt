package com.sonorasync.service;

import com.sonorasync.dto.request.LogAuditoriaRequestDTO;
import com.sonorasync.dto.response.LogAuditoriaResponseDTO;
import com.sonorasync.model.LogAuditoria;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryLogAuditoria;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.service.ServiceUsuario;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceLogAuditoria {
    @Autowired private RepositoryLogAuditoria repository;
    @Autowired private RepositoryUsuario repositoryUsuario;
    @Autowired private ServiceUsuario serviceUsuario;

    public List<LogAuditoriaResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public LogAuditoriaResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public LogAuditoriaResponseDTO save(LogAuditoriaRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    public LogAuditoriaResponseDTO update(Long id, LogAuditoriaRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getIdUsuario() != null) {
                repositoryUsuario.findById(dto.getIdUsuario()).ifPresent(entity::setUsuario);
            }
            if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
            if (dto.getTipoEvento() != null) entity.setTipoEvento(dto.getTipoEvento());
            if (dto.getModulo() != null) entity.setModulo(dto.getModulo());
            if (dto.getAccion() != null) entity.setAccion(dto.getAccion());
            if (dto.getEntidad() != null) entity.setEntidad(dto.getEntidad());
            if (dto.getIdEntidad() != null) entity.setIdEntidad(dto.getIdEntidad());
            if (dto.getIpOrigen() != null) entity.setIpOrigen(dto.getIpOrigen());
            if (dto.getUserAgent() != null) entity.setUserAgent(dto.getUserAgent());
            if (dto.getDetalle() != null) entity.setDetalle(dto.getDetalle());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public LogAuditoriaResponseDTO toResponseDTO(LogAuditoria entity) {
        if (entity == null) return null;
        LogAuditoriaResponseDTO dto = new LogAuditoriaResponseDTO();
        dto.setIdLog(entity.getIdLog());
        if (entity.getUsuario() != null) {
            dto.setUsuario(serviceUsuario.toResponseDTO(entity.getUsuario()));
        }
        dto.setFechaHora(entity.getFechaHora());
        dto.setTipoEvento(entity.getTipoEvento());
        dto.setModulo(entity.getModulo());
        dto.setAccion(entity.getAccion());
        dto.setEntidad(entity.getEntidad());
        dto.setIdEntidad(entity.getIdEntidad());
        dto.setIpOrigen(entity.getIpOrigen());
        dto.setUserAgent(entity.getUserAgent());
        dto.setDetalle(entity.getDetalle());
        return dto;
    }

    public LogAuditoria toEntity(LogAuditoriaRequestDTO dto) {
        if (dto == null) return null;
        LogAuditoria entity = new LogAuditoria();
        if (dto.getIdUsuario() != null) {
            repositoryUsuario.findById(dto.getIdUsuario()).ifPresent(entity::setUsuario);
        }
        if (dto.getFechaHora() != null) entity.setFechaHora(dto.getFechaHora());
        if (dto.getTipoEvento() != null) entity.setTipoEvento(dto.getTipoEvento());
        if (dto.getModulo() != null) entity.setModulo(dto.getModulo());
        if (dto.getAccion() != null) entity.setAccion(dto.getAccion());
        if (dto.getEntidad() != null) entity.setEntidad(dto.getEntidad());
        if (dto.getIdEntidad() != null) entity.setIdEntidad(dto.getIdEntidad());
        if (dto.getIpOrigen() != null) entity.setIpOrigen(dto.getIpOrigen());
        if (dto.getUserAgent() != null) entity.setUserAgent(dto.getUserAgent());
        if (dto.getDetalle() != null) entity.setDetalle(dto.getDetalle());
        return entity;
    }
}
