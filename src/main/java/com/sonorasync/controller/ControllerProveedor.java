package com.sonorasync.controller;

import com.sonorasync.dto.request.ProveedorRequestDTO;
import com.sonorasync.dto.response.ProveedorResponseDTO;
import com.sonorasync.service.ServiceProveedor;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@RequiredArgsConstructor
public class ControllerProveedor {

    private final ServiceProveedor service;

    @GetMapping
    public List<ProveedorResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveedorResponseDTO> findById(@PathVariable Long id) {
        ProveedorResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ProveedorResponseDTO> save(@Valid @RequestBody ProveedorRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProveedorResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ProveedorRequestDTO request) {
        ProveedorResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
