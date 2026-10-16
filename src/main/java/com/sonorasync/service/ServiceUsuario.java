package com.sonorasync.service;

import com.sonorasync.dto.request.UsuarioRequestDTO;
import com.sonorasync.dto.response.UsuarioResponseDTO;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceUsuario {

    private final RepositoryUsuario repository;

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> findAll() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO findById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    @Transactional
    public UsuarioResponseDTO save(UsuarioRequestDTO dto) {
        return toResponseDTO(repository.save(toEntity(dto)));
    }

    @Transactional
    public UsuarioResponseDTO update(Long id, UsuarioRequestDTO dto) {
        return repository.findById(id).map(entity -> {
            if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
            if (dto.getApellidos() != null) entity.setApellidos(dto.getApellidos());
            if (dto.getCorreo() != null) entity.setCorreo(dto.getCorreo());
            if (dto.getTelefono() != null) entity.setTelefono(dto.getTelefono());
            if (dto.getDireccion() != null) entity.setDireccion(dto.getDireccion());
            if (dto.getFechaNacimiento() != null) entity.setFechaNacimiento(dto.getFechaNacimiento());
            if (dto.getCurp() != null) entity.setCurp(dto.getCurp());
            if (dto.getContrasena() != null && !dto.getContrasena().isBlank()) {
                entity.setContrasenaHash(dto.getContrasena());
            }
            if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
            entity.setActualizadoEn(LocalDateTime.now());
            return toResponseDTO(repository.save(entity));
        }).orElse(null);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public UsuarioResponseDTO toResponseDTO(Usuario entity) {
        if (entity == null) return null;
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setIdUsuario(entity.getIdUsuario());
        dto.setNombre(entity.getNombre());
        dto.setApellidos(entity.getApellidos());
        dto.setCorreo(entity.getCorreo());
        dto.setTelefono(entity.getTelefono());
        dto.setDireccion(entity.getDireccion());
        dto.setFechaNacimiento(entity.getFechaNacimiento());
        dto.setCurp(entity.getCurp());
        dto.setActivo(entity.getActivo());
        dto.setIntentosFallidos(entity.getIntentosFallidos());
        dto.setBloqueadoHasta(entity.getBloqueadoHasta());
        dto.setCreadoEn(entity.getCreadoEn());
        dto.setActualizadoEn(entity.getActualizadoEn());
        return dto;
    }

    public Usuario toEntity(UsuarioRequestDTO dto) {
        if (dto == null) return null;
        Usuario entity = new Usuario();
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getApellidos() != null) entity.setApellidos(dto.getApellidos());
        if (dto.getCorreo() != null) entity.setCorreo(dto.getCorreo());
        if (dto.getTelefono() != null) entity.setTelefono(dto.getTelefono());
        if (dto.getDireccion() != null) entity.setDireccion(dto.getDireccion());
        if (dto.getFechaNacimiento() != null) entity.setFechaNacimiento(dto.getFechaNacimiento());
        if (dto.getCurp() != null) entity.setCurp(dto.getCurp());
        if (dto.getContrasena() != null) {
            entity.setContrasenaHash(dto.getContrasena());
        } else if (dto.getContrasenaHash() != null) {
            entity.setContrasenaHash(dto.getContrasenaHash());
        }
        if (dto.getActivo() != null) entity.setActivo(dto.getActivo());
        if (entity.getActivo() == null) entity.setActivo(true);
        if (entity.getIntentosFallidos() == null) entity.setIntentosFallidos(0);
        if (entity.getCreadoEn() == null) entity.setCreadoEn(LocalDateTime.now());
        if (entity.getActualizadoEn() == null) entity.setActualizadoEn(LocalDateTime.now());
        return entity;
    }
}
