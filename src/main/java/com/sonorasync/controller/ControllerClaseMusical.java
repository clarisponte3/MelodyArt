package com.sonorasync.controller;

import com.sonorasync.dto.request.ClaseMusicalRequestDTO;
import com.sonorasync.dto.response.ClaseMusicalResponseDTO;
import com.sonorasync.service.ServiceClaseMusical;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clases-musicales")
public class ControllerClaseMusical {
    @Autowired private ServiceClaseMusical service;

    @GetMapping
    public List<ClaseMusicalResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClaseMusicalResponseDTO> findById(@PathVariable Long id) {
        ClaseMusicalResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ClaseMusicalResponseDTO> save(@RequestBody ClaseMusicalRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClaseMusicalResponseDTO> update(@PathVariable Long id, @RequestBody ClaseMusicalRequestDTO request) {
        ClaseMusicalResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
