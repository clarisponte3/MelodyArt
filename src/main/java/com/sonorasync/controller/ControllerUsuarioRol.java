package com.sonorasync.controller;

import com.sonorasync.dto.request.UsuarioRolRequestDTO;
import com.sonorasync.dto.response.UsuarioRolResponseDTO;
import com.sonorasync.model.UsuarioRol;
import com.sonorasync.service.ServiceUsuarioRol;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios-roles")
@RequiredArgsConstructor
public class ControllerUsuarioRol {

    private final ServiceUsuarioRol service;

    @GetMapping
    public List<UsuarioRolResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{idUsuario}/{idRol}")
    public ResponseEntity<UsuarioRolResponseDTO> findById(@PathVariable Long idUsuario, @PathVariable Long idRol) {
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(idUsuario);
        id.setIdRol(idRol);
        UsuarioRolResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UsuarioRolResponseDTO> save(@Valid @RequestBody UsuarioRolRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @DeleteMapping("/{idUsuario}/{idRol}")
    public ResponseEntity<Void> delete(@PathVariable Long idUsuario, @PathVariable Long idRol) {
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(idUsuario);
        id.setIdRol(idRol);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
