package com.sonorasync.controller;

import com.sonorasync.dto.request.AsistenciaClaseRequestDTO;
import com.sonorasync.dto.response.AsistenciaClaseResponseDTO;
import com.sonorasync.service.ServiceAsistenciaClase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class ControllerAsistenciaClase {
    @Autowired private ServiceAsistenciaClase service;

    @GetMapping
    public List<AsistenciaClaseResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AsistenciaClaseResponseDTO> findById(@PathVariable Long id) {
        AsistenciaClaseResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AsistenciaClaseResponseDTO> save(@RequestBody AsistenciaClaseRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AsistenciaClaseResponseDTO> update(@PathVariable Long id, @RequestBody AsistenciaClaseRequestDTO request) {
        AsistenciaClaseResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
