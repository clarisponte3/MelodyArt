package com.sonorasync.controller;

import com.sonorasync.dto.request.RolPermisoRequestDTO;
import com.sonorasync.dto.response.RolPermisoResponseDTO;
import com.sonorasync.model.RolPermiso;
import com.sonorasync.service.ServiceRolPermiso;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles-permisos")
@RequiredArgsConstructor
public class ControllerRolPermiso {

    private final ServiceRolPermiso service;

    @GetMapping
    public List<RolPermisoResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{idRol}/{idPermiso}")
    public ResponseEntity<RolPermisoResponseDTO> findById(@PathVariable Long idRol, @PathVariable Long idPermiso) {
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(idRol);
        id.setIdPermiso(idPermiso);
        RolPermisoResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<RolPermisoResponseDTO> save(@Valid @RequestBody RolPermisoRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @DeleteMapping("/{idRol}/{idPermiso}")
    public ResponseEntity<Void> delete(@PathVariable Long idRol, @PathVariable Long idPermiso) {
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(idRol);
        id.setIdPermiso(idPermiso);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
