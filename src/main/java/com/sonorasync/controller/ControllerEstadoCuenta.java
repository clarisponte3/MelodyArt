package com.sonorasync.controller;

import com.sonorasync.dto.request.EstadoCuentaRequestDTO;
import com.sonorasync.dto.response.EstadoCuentaResponseDTO;
import com.sonorasync.service.ServiceEstadoCuenta;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estados-cuenta")
@RequiredArgsConstructor
public class ControllerEstadoCuenta {

    private final ServiceEstadoCuenta service;

    @GetMapping
    public List<EstadoCuentaResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadoCuentaResponseDTO> findById(@PathVariable Long id) {
        EstadoCuentaResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EstadoCuentaResponseDTO> save(@Valid @RequestBody EstadoCuentaRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstadoCuentaResponseDTO> update(@PathVariable Long id, @Valid @RequestBody EstadoCuentaRequestDTO request) {
        EstadoCuentaResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
