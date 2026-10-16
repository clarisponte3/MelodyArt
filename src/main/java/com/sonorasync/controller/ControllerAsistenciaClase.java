package com.sonorasync.controller;

import com.sonorasync.dto.request.AsistenciaClaseRequestDTO;
import com.sonorasync.dto.response.AsistenciaClaseResponseDTO;
import com.sonorasync.service.ServiceAsistenciaClase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/asistencias")
@RequiredArgsConstructor
public class ControllerAsistenciaClase {

    private final ServiceAsistenciaClase service;

    @GetMapping
    public Page<AsistenciaClaseResponseDTO> findAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AsistenciaClaseResponseDTO> findById(@PathVariable Long id) {
        AsistenciaClaseResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AsistenciaClaseResponseDTO> save(@Valid @RequestBody AsistenciaClaseRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AsistenciaClaseResponseDTO> update(@PathVariable Long id, @Valid @RequestBody AsistenciaClaseRequestDTO request) {
        AsistenciaClaseResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
