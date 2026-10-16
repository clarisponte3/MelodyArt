package com.sonorasync.controller;

import com.sonorasync.dto.request.EvaluacionRequestDTO;
import com.sonorasync.dto.response.EvaluacionResponseDTO;
import com.sonorasync.service.ServiceEvaluacion;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluaciones")
@RequiredArgsConstructor
public class ControllerEvaluacion {

    private final ServiceEvaluacion service;

    @GetMapping
    public List<EvaluacionResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvaluacionResponseDTO> findById(@PathVariable Long id) {
        EvaluacionResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EvaluacionResponseDTO> save(@Valid @RequestBody EvaluacionRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EvaluacionResponseDTO> update(@PathVariable Long id, @Valid @RequestBody EvaluacionRequestDTO request) {
        EvaluacionResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
