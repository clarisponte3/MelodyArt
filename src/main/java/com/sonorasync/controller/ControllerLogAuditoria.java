package com.sonorasync.controller;

import com.sonorasync.dto.request.LogAuditoriaRequestDTO;
import com.sonorasync.dto.response.LogAuditoriaResponseDTO;
import com.sonorasync.service.ServiceLogAuditoria;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs-auditoria")
@RequiredArgsConstructor
public class ControllerLogAuditoria {

    private final ServiceLogAuditoria service;

    @GetMapping
    public List<LogAuditoriaResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogAuditoriaResponseDTO> findById(@PathVariable Long id) {
        LogAuditoriaResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<LogAuditoriaResponseDTO> save(@Valid @RequestBody LogAuditoriaRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogAuditoriaResponseDTO> update(@PathVariable Long id, @Valid @RequestBody LogAuditoriaRequestDTO request) {
        LogAuditoriaResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
