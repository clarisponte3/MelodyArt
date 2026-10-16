package com.sonorasync.controller;

import com.sonorasync.dto.request.ConceptoPagoRequestDTO;
import com.sonorasync.dto.response.ConceptoPagoResponseDTO;
import com.sonorasync.service.ServiceConceptoPago;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conceptos-pago")
@RequiredArgsConstructor
public class ControllerConceptoPago {

    private final ServiceConceptoPago service;

    @GetMapping
    public List<ConceptoPagoResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConceptoPagoResponseDTO> findById(@PathVariable Long id) {
        ConceptoPagoResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ConceptoPagoResponseDTO> save(@Valid @RequestBody ConceptoPagoRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConceptoPagoResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ConceptoPagoRequestDTO request) {
        ConceptoPagoResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
