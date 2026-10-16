package com.sonorasync.controller;

import com.sonorasync.dto.request.MovimientoInventarioRequestDTO;
import com.sonorasync.dto.response.MovimientoInventarioResponseDTO;
import com.sonorasync.service.ServiceMovimientoInventario;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimientos-inventario")
@RequiredArgsConstructor
public class ControllerMovimientoInventario {

    private final ServiceMovimientoInventario service;

    @GetMapping
    public Page<MovimientoInventarioResponseDTO> findAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoInventarioResponseDTO> findById(@PathVariable Long id) {
        MovimientoInventarioResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MovimientoInventarioResponseDTO> save(@Valid @RequestBody MovimientoInventarioRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimientoInventarioResponseDTO> update(@PathVariable Long id, @Valid @RequestBody MovimientoInventarioRequestDTO request) {
        MovimientoInventarioResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
