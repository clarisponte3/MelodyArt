package com.sonorasync.controller;

import com.sonorasync.dto.request.CompraRequestDTO;
import com.sonorasync.dto.response.CompraResponseDTO;
import com.sonorasync.service.ServiceCompra;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@RequiredArgsConstructor
public class ControllerCompra {

    private final ServiceCompra service;

    @GetMapping
    public List<CompraResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompraResponseDTO> findById(@PathVariable Long id) {
        CompraResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CompraResponseDTO> save(@Valid @RequestBody CompraRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompraResponseDTO> update(@PathVariable Long id, @Valid @RequestBody CompraRequestDTO request) {
        CompraResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
