package com.sonorasync.controller;

import com.sonorasync.dto.request.DetalleVentaRequestDTO;
import com.sonorasync.dto.response.DetalleVentaResponseDTO;
import com.sonorasync.service.ServiceDetalleVenta;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles-venta")
@RequiredArgsConstructor
public class ControllerDetalleVenta {

    private final ServiceDetalleVenta service;

    @GetMapping
    public List<DetalleVentaResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleVentaResponseDTO> findById(@PathVariable Long id) {
        DetalleVentaResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<DetalleVentaResponseDTO> save(@Valid @RequestBody DetalleVentaRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleVentaResponseDTO> update(@PathVariable Long id, @Valid @RequestBody DetalleVentaRequestDTO request) {
        DetalleVentaResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
