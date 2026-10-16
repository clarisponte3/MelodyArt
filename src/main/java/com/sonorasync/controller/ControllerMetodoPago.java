package com.sonorasync.controller;

import com.sonorasync.dto.request.MetodoPagoRequestDTO;
import com.sonorasync.dto.response.MetodoPagoResponseDTO;
import com.sonorasync.service.ServiceMetodoPago;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
@RequiredArgsConstructor
public class ControllerMetodoPago {

    private final ServiceMetodoPago service;

    @GetMapping
    public List<MetodoPagoResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetodoPagoResponseDTO> findById(@PathVariable Long id) {
        MetodoPagoResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MetodoPagoResponseDTO> save(@Valid @RequestBody MetodoPagoRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetodoPagoResponseDTO> update(@PathVariable Long id, @Valid @RequestBody MetodoPagoRequestDTO request) {
        MetodoPagoResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
