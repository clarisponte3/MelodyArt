package com.sonorasync.controller;

import com.sonorasync.dto.request.MarcaRequestDTO;
import com.sonorasync.dto.response.MarcaResponseDTO;
import com.sonorasync.service.ServiceMarca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marcas")
public class ControllerMarca {
    @Autowired private ServiceMarca service;

    @GetMapping
    public List<MarcaResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarcaResponseDTO> findById(@PathVariable Long id) {
        MarcaResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MarcaResponseDTO> save(@RequestBody MarcaRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarcaResponseDTO> update(@PathVariable Long id, @RequestBody MarcaRequestDTO request) {
        MarcaResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
