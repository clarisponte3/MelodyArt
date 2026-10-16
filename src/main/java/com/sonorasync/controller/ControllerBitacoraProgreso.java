package com.sonorasync.controller;

import com.sonorasync.dto.request.BitacoraProgresoRequestDTO;
import com.sonorasync.dto.response.BitacoraProgresoResponseDTO;
import com.sonorasync.service.ServiceBitacoraProgreso;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bitacoras")
@RequiredArgsConstructor
public class ControllerBitacoraProgreso {

    private final ServiceBitacoraProgreso service;

    @GetMapping
    public List<BitacoraProgresoResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BitacoraProgresoResponseDTO> findById(@PathVariable Long id) {
        BitacoraProgresoResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<BitacoraProgresoResponseDTO> save(@Valid @RequestBody BitacoraProgresoRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BitacoraProgresoResponseDTO> update(@PathVariable Long id, @Valid @RequestBody BitacoraProgresoRequestDTO request) {
        BitacoraProgresoResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
