package com.sonorasync.controller;

import com.sonorasync.dto.request.PagoMensualidadRequestDTO;
import com.sonorasync.dto.response.PagoMensualidadResponseDTO;
import com.sonorasync.service.ServicePagoMensualidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos-mensualidad")
public class ControllerPagoMensualidad {
    @Autowired private ServicePagoMensualidad service;

    @GetMapping
    public List<PagoMensualidadResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoMensualidadResponseDTO> findById(@PathVariable Long id) {
        PagoMensualidadResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PagoMensualidadResponseDTO> save(@RequestBody PagoMensualidadRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagoMensualidadResponseDTO> update(@PathVariable Long id, @RequestBody PagoMensualidadRequestDTO request) {
        PagoMensualidadResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
