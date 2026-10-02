package com.sonorasync.controller;

import com.sonorasync.dao.DaoInscripcion;
import com.sonorasync.service.ServiceInscripcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
public class ControllerInscripcion {
    @Autowired private ServiceInscripcion service;
    @GetMapping public List<DaoInscripcion> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoInscripcion> findById(@PathVariable Long id) {
        DaoInscripcion dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoInscripcion> save(@RequestBody DaoInscripcion dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoInscripcion> update(@PathVariable Long id, @RequestBody DaoInscripcion dao) {
        DaoInscripcion updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
