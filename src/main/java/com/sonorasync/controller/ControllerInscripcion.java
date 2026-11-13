package com.sonorasync.controller;

import com.sonorasync.dto.request.InscripcionRequestDTO;
import com.sonorasync.dto.response.InscripcionResponseDTO;
import com.sonorasync.service.ServiceInscripcion;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador de Inscripciones.
 * - GET  /api/inscripciones          → accesible por todos los roles autenticados
 * - POST /api/inscripciones          → solo ALUMNO, USER, ADMIN, ADMINISTRADOR
 * - PUT  /api/inscripciones/{id}     → solo ADMIN o ADMINISTRADOR
 * - DELETE /api/inscripciones/{id}   → solo ADMIN o ADMINISTRADOR
 */
@RestController
@RequestMapping("/api/inscripciones")
@RequiredArgsConstructor
public class ControllerInscripcion {

    private final ServiceInscripcion service;

    /** Listar todas las inscripciones (visible para todos los roles autenticados) */
    @GetMapping
    public List<InscripcionResponseDTO> findAll() {
        return service.findAll();
    }

    /** Buscar inscripción por ID */
    @GetMapping("/{id}")
    public ResponseEntity<InscripcionResponseDTO> findById(@PathVariable Long id) {
        InscripcionResponseDTO res = service.findById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    /**
     * Crear inscripción.
     * Solo alumnos, clientes y administradores pueden crear inscripciones.
     * Los docentes no tienen permiso de inscribirse a sí mismos como alumnos.
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ALUMNO', 'USER', 'ADMIN', 'ADMINISTRADOR', 'VENDEDOR')")
    public ResponseEntity<InscripcionResponseDTO> save(@Valid @RequestBody InscripcionRequestDTO request) {
        return ResponseEntity.ok(service.save(request));
    }

    /**
     * Actualizar inscripción (solo Admin / Administrador).
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRADOR')")
    public ResponseEntity<InscripcionResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody InscripcionRequestDTO request) {
        InscripcionResponseDTO updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    /**
     * Eliminar inscripción (solo Admin / Administrador).
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRADOR')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
