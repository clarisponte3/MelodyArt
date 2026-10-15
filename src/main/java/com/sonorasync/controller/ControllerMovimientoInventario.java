package com.sonorasync.controller;

import com.sonorasync.dto.request.MovimientoInventarioRequestDTO;
import com.sonorasync.dto.response.MovimientoInventarioResponseDTO;
import com.sonorasync.service.ServiceMovimientoInventario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos-inventario")
public class ControllerMovimientoInventario {
    @Autowired private ServiceMovimientoInventario service;

    @GetMapping
    public List<MovimientoInventarioResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoInventarioResponseDTO> findById(@PathVariable Long id) {
        MovimientoInventarioResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MovimientoInventarioResponseDTO> save(@RequestBody MovimientoInventarioRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimientoInventarioResponseDTO> update(@PathVariable Long id, @RequestBody MovimientoInventarioRequestDTO request) {
        MovimientoInventarioResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
