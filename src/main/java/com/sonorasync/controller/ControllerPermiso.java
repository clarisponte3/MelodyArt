package com.sonorasync.controller;

import com.sonorasync.dto.request.PermisoRequestDTO;
import com.sonorasync.dto.response.PermisoResponseDTO;
import com.sonorasync.service.ServicePermiso;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permisos")
@RequiredArgsConstructor
public class ControllerPermiso {

    private final ServicePermiso service;

    @GetMapping
    public List<PermisoResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PermisoResponseDTO> findById(@PathVariable Long id) {
        PermisoResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PermisoResponseDTO> save(@Valid @RequestBody PermisoRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PermisoResponseDTO> update(@PathVariable Long id, @Valid @RequestBody PermisoRequestDTO request) {
        PermisoResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
