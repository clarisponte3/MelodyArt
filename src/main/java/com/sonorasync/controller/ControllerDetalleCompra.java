package com.sonorasync.controller;

import com.sonorasync.dto.request.DetalleCompraRequestDTO;
import com.sonorasync.dto.response.DetalleCompraResponseDTO;
import com.sonorasync.service.ServiceDetalleCompra;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles-compra")
@RequiredArgsConstructor
public class ControllerDetalleCompra {

    private final ServiceDetalleCompra service;

    @GetMapping
    public List<DetalleCompraResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleCompraResponseDTO> findById(@PathVariable Long id) {
        DetalleCompraResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<DetalleCompraResponseDTO> save(@Valid @RequestBody DetalleCompraRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleCompraResponseDTO> update(@PathVariable Long id, @Valid @RequestBody DetalleCompraRequestDTO request) {
        DetalleCompraResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
