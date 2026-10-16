package com.sonorasync.controller;

import com.sonorasync.dto.request.InscripcionRequestDTO;
import com.sonorasync.dto.response.InscripcionResponseDTO;
import com.sonorasync.service.ServiceInscripcion;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
@RequiredArgsConstructor
public class ControllerInscripcion {

    private final ServiceInscripcion service;

    @GetMapping
    public List<InscripcionResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionResponseDTO> findById(@PathVariable Long id) {
        InscripcionResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<InscripcionResponseDTO> save(@Valid @RequestBody InscripcionRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscripcionResponseDTO> update(@PathVariable Long id, @Valid @RequestBody InscripcionRequestDTO request) {
        InscripcionResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
