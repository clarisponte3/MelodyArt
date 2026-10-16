package com.sonorasync.controller;

import com.sonorasync.dto.request.AulaRequestDTO;
import com.sonorasync.dto.response.AulaResponseDTO;
import com.sonorasync.service.ServiceAula;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aulas")
@RequiredArgsConstructor
public class ControllerAula {

    private final ServiceAula service;

    @GetMapping
    public List<AulaResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AulaResponseDTO> findById(@PathVariable Long id) {
        AulaResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AulaResponseDTO> save(@Valid @RequestBody AulaRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AulaResponseDTO> update(@PathVariable Long id, @Valid @RequestBody AulaRequestDTO request) {
        AulaResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
